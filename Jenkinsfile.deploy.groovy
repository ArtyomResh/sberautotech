library('utils@master')

timestamps {
    node(params.build_node) {
        wrap([$class: 'AnsiColorBuildWrapper', colorMapName: "xterm"]) {
            cleanWs()

            gitlabBuilds(builds: ['Prepare', 'Clone source', 'Build', 'Deploy']) {
                gitlabCommitStatus('Prepare') {
                    stage('Prepare') {
                        configFileProvider([configFile(fileId: params.config, variable: 'configFile')]) {
                            config = readJSON file: configFile
                        }

                        commitSha = null
                        if (env.gitlabActionType) {
                            repository = gitUtils.getRepositoryFromEnv(this)
                            commitSha = repository.latest_commit
                            log.info("Change type: ${repository.changes_type}, source branch: ${repository.source_branch}")
                        } else {
                            repository = [
                                'address': scm.getUserRemoteConfigs()[0].getUrl(),
                                'source_branch': params.build_branch,
                                'target_branch': params.build_branch
                            ]
                        }

                        repository['credentials'] = config.gitlab.ssh_credentials

                        repo_name = repository.address.split('/')[4].replace('.git', '')
                        app_name = repo_name.replaceAll("_|\\.", "-")
                        branch = repository.source_branch.replaceAll('^origin/', '')

                        info = "*${app_name}*: Build & Deploy\nBranch: ${repository.source_branch}\n"
                    }
                }

                try {
                    gitlabCommitStatus("Clone source") {
                        stage('Clone source') {
                            try {
                                gitUtils.checkoutRepository(repository, false)
                            } catch (checkoutError) {
                                log.error("Checkout Failed")
                                info += "*checkout stage:* :warning:"
                                throw checkoutError
                            }

                            commitSha = (commitSha == null) ? sh(script: 'git rev-parse HEAD', returnStdout: true).trim() : commitSha
                            changelog = sh(script: 'git --no-pager log HEAD~1..HEAD | sed -rn "s/[[:space:]]{4}(.*)/* \\1/p"', returnStdout: true)
                            manager.addBadge('orange-square.png', "Commit #${commitSha}", commitSha)

                            version = branch.replaceAll("/|-", "_") + "-" + commitSha.take(6) + "-${env.BUILD_ID}"
                            log.info("Checked out branch: ${branch}, generate version ${version}")
                            info += "Generated version: ${version}\nChangelog:\n${changelog}\n\nBuild URL: ${env.BUILD_URL}\nStatus: "
                        }
                    }

                    gitlabCommitStatus('Build') {
                        stage('Build') {
                            if (params.package_name == 'backend') {
                                image = "${config.docker_registry.host}/${config.docker_registry.dir}/${repo_name}/${params.package_name}:${version}"
                                log.info("Building image ${image}")
                                try {
                                    docker.withRegistry("https://${config.docker_registry.host}", config.docker_registry.credentials) {
                                        backend = docker.build("${image}", "--pull --no-cache --build-arg DOCKER_REGISTRY=${config.docker_registry.host}/infra/docker -f backend/Dockerfile .")
                                        backend.push()
                                    }
                                } catch (buildError) {
                                    log.error("Build failed: ${buildError}")
                                    info += "*build backend:* :warning:"
                                    throw buildError
                                }
                            }

                            if (params.package_name == 'frontend') {
                                image = "${config.docker_registry.host}/${config.docker_registry.dir}/${repo_name}/${params.package_name}:${version}"
                                log.info("Building image ${image}")

                                try {
                                    docker.withRegistry("https://${config.docker_registry.host}", config.docker_registry.credentials) {
                                        frontend = docker.build("${image}", "--pull --no-cache --build-arg DOCKER_REGISTRY=${config.docker_registry.host}/infra/docker --build-arg BACKEND_API_URL=${params.backend_url} -f frontend/Dockerfile .")
                                        frontend.push()
                                    }
                                } catch (buildError) {
                                    log.error("Build failed: ${buildError}")
                                    info += "*build frontend:* :warning:"
                                    throw buildError
                                }
                            }
                        }
                    }

                    gitlabCommitStatus('Deploy') {
                        stage('Deploy') {
                            stand = 'fe-dev'
                            log.info("Deploy image ${image} on stand ${stand}")
                            dir("${WORKSPACE}/${params.package_name}/devops/k8s") {
                                try {
                                    withCredentials([file(credentialsId: config.k8s[stand].credentials, variable: 'k8sConfig')]) {
                                        ansiblePlaybook(
                                            colorized: true,
                                            playbook: 'playbook.yml',
                                            extraVars: [
                                                k8s_config: k8sConfig,
                                                app_name: app_name,
                                                package_name: params.package_name,
                                                app_version: version,
                                                image: image,
                                                stand: stand
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
                    }
                } catch (Exception e) {
                    currentBuild.result = "FAILURE"
                    slackSend(channel: config.slack.frontend_channel, message: info)
                    throw e
                }

                summary = manager.createSummary("green.gif")
                summary.appendText("<h3>${params.package_name} version: ${version}</h3>", false, false, false, "black")

                info += ":ok_hand:"
                slackSend(channel: config.slack.frontend_channel, message: info)
            }
        }
    }
}
