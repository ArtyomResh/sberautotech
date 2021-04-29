library('utils@master')

timestamps {
    node(params.build_node) {
        wrap([$class: 'AnsiColorBuildWrapper', colorMapName: "xterm"]) {
            cleanWs()

            stage('Prepare') {
                configFileProvider([configFile(fileId: params.config, variable: 'configFile')]) {
                    config = readJSON file: configFile
                }

                registry_location = (params.docker_registry) ? params.docker_registry : "gitlab"
                docker_registry = config.docker_registries[registry_location]
                withCredentials([string(credentialsId: config.slack.frontend_secret_id, variable: 'slackHook')]) {
                    config.slack.frontend_hook = slackHook
                }

                // Parse bitbucket payload or fill from params
                commitSha = null
                if (env.BITBUCKET_PAYLOAD) {
                    repository = getBitbucketEnv(env.BITBUCKET_PAYLOAD)
                    commitSha = repository.latest_commit
                    log.info("Change reftype: ${repository.changes_reftype}, change type: ${repository.changes_type}, source branch: ${repository.source_branch}")
                    if (repository.changes_reftype == 'TAG' && repository.changes_type == 'DELETE') {
                        error('Exiting')
                    }
                } else {
                    repository = [
                        'address': scm.getUserRemoteConfigs()[0].getUrl(),
                        'source_branch': params.build_branch,
                        'target_branch': params.build_branch
                    ]
                }

                repository['credentials'] = config.bitbucket.ssh_credentials

                repo_name = repository.address.split('/')[4].replace('.git', '')
                name = repo_name.replaceAll("_|\\.", "-")
                branch = repository.source_branch.replaceAll('^origin/', '')

                info = "*${name}*: Build & Deploy\nBranch: ${repository.source_branch}\n"
            }

            try {
                stage('Checkout') {
                    try {
                        checkoutBitbucket(repository, false)
                    } catch (checkoutError) {
                        log.error("Checkout Failed")
                        info += "*checkout stage:* :warning:"
                        throw checkoutError
                    }

                    commitSha = (commitSha == null) ? sh(script: 'git rev-parse HEAD', returnStdout: true).trim() : commitSha

                    if (repository.source_branch.startsWith('refs/tags')) {
                        version = repository.source_branch.replaceAll('refs/tags/', '')
                        stand = 'dev'
                    } else {
                        version = branch.replaceAll("/|-", "_") + "-" + commitSha.take(6)
                        stand = 'dev'
                    }

                    changelog = sh(script: 'git --no-pager log HEAD~1..HEAD | sed -rn "s/[[:space:]]{6}(.*)/* \\1/p"', returnStdout: true)

                    log.info("Checked out branch: ${branch}, generate version ${version}")
                    info += "Generated version: ${version}\nChangelog:\n${changelog}\n\nBuild URL: ${env.BUILD_URL}\nStatus: "
                    notifyBitbucketStatus('INPROGRESS', config.bitbucket, commitSha)
                    manager.addBadge('orange-square.png', "Commit #${commitSha}", commitSha)
                }
                if (params.package_name == 'backend') {
                    stage('Build backend') {
                        image = "${docker_registry.host}/${docker_registry.dir}/${repo_name}/${params.package_name}:${version}"
                        log.info("Building image ${image}")

                        try {
                            docker.withRegistry("https://${docker_registry.host}", docker_registry.creds) {
                                backend = docker.build("${image}", "--pull --build-arg DOCKER_REGISTRY=${docker_registry.host}/infra/docker -f backend/Dockerfile .")
                                backend.push()
                            }
                        } catch (buildError) {
                            log.error("Build failed: ${buildError}")
                            info += "*build backend:* :warning:"
                            throw buildError
                        }
                    }
                }

                if (params.package_name == 'frontend') {
                    stage('Build frontend') {
                        image = "${docker_registry.host}/${docker_registry.dir}/${repo_name}/${params.package_name}:${version}"
                        log.info("Building image ${image}")

                        try {
                            docker.withRegistry("https://${docker_registry.host}", docker_registry.creds) {
                                frontend = docker.build("${image}", "--pull --no-cache --build-arg DOCKER_REGISTRY=${docker_registry.host}/infra/docker --build-arg BACKEND_API_URL=${params.backend_url} -f frontend/Dockerfile .")
                                frontend.push()
                            }
                        } catch (buildError) {
                            log.error("Build failed: ${buildError}")
                            info += "*build frontend:* :warning:"
                            throw buildError
                        }
                    }
                }

                stage('Deploy') {
                    log.info("Deploy image ${image} on stand ${stand}")

                    k8s_dir = "${WORKSPACE}/${params.package_name}/devops/k8s"
                    dir(k8s_dir) {
                        try {
                            withCredentials([file(credentialsId: config.k8s[stand].creds, variable: 'k8s_config')]) {
                                ansiblePlaybook(
                                    colorized: true,
                                    playbook: 'playbook.yml',
                                    extraVars: [
                                        k8s_config: k8s_config,
                                        app_name: name,
                                        package_name: params.package_name,
                                        app_version: version,
                                        stand: stand,
                                        docker_registry: "${docker_registry.host}/${docker_registry.dir}/${repo_name}"
                                    ]
                                )
                            }
                        } catch (deployError) {
                            log.error("Failed to deploy image: ${deployError}")
                            info += ":warning:"
                            throw deployError
                        }
                    }
                }
            } catch (Exception e) {
                notifyBitbucketStatus('FAILED', config.bitbucket, commitSha)
                publishToSlack(config.slack.frontend_hook, info)
                throw e
            }

            info += ":ok_hand:"
            notifyBitbucketStatus('SUCCESS', config.bitbucket, commitSha)
            publishToSlack(config.slack.frontend_hook, info)
        }
    }
}
