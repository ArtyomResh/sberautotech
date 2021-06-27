library('utils@master')

timestamps {
    node(params.build_node) {
        wrap([$class: 'AnsiColorBuildWrapper', colorMapName: "xterm"]) {
            cleanWs()

            stage('Prepare') {
                if (params.version == '') {
                    error('Version must be specified')
                }

                configFileProvider([configFile(fileId: params.config, variable: 'configFile')]) {
                    config = readJSON file: configFile
                }

                repository = [
                    'address': scm.getUserRemoteConfigs()[0].getUrl(),
                    'source_branch': scm.getBranches()[0].toString(),
                    'target_branch': scm.getBranches()[0].toString(),
                    'credentials': config.gitlab.ssh_credentials
                ]

                repo_name = repository.address.split('/')[4].replace('.git', '')
                app_name = repo_name.replaceAll("_|\\.", "-")
                manager.addBadge('orange-square.png', "Version #${params.version}", params.version)
                info = "*${repo_name}*: Deploy on PROD\n\nVersion: *${params.version}*\nJob URL: ${env.BUILD_URL}\nStatus: "
            }

            try {
                stage('Clone source') {
                    try {
                        gitUtils.checkoutRepository(repository, false)
                    } catch (checkoutError) {
                        log.error("Checkout Failed")
                        info += ":x: checkout faled"
                        throw checkoutError
                    }

                    log.info("Checked out branch: ${params.version}")
                }

                stage('Check image') {
                    image = "${config.docker_registry.host}/${config.docker_registry.dir}/${repo_name}/${params.package}:${version}"
                    log.info("Pull image ${image}")
                    docker.withRegistry("https://${config.docker_registry.host}", config.docker_registry.credentials) {
                        try {
                            sh("docker pull ${image}")
                        } catch (pullError) {
                            log.error("Failed to pull release image: ${pullError}")
                            info += ":warning:"
                            throw pullError
                        }
                    }
                }

                stage('Deploy') {
                    stand = 'infra'
                    log.info("Deploy ${image} on PROD")
                    dir("${WORKSPACE}/${params.package}/devops/k8s") {
                        try {
                            withCredentials([file(credentialsId: config.k8s[stand].credentials, variable: 'k8sConfig')]) {
                                ansiblePlaybook(
                                    colorized: true,
                                    playbook: 'playbook.yml',
                                    extraVars: [
                                        k8s_config: k8sConfig,
                                        app_name: app_name,
                                        package_name: params.package,
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
            } catch (Exception e) {
                currentBuild.result = "FAILURE"
                slackSend(channel: config.slack.frontend_channel, message: info)
                throw e
            }

            info += ":ok_hand:"
            slackSend(channel: config.slack.frontend_channel, message: info)
        }
    }
}
