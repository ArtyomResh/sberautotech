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

                withCredentials([string(credentialsId: config.slack.frontend_secret_id, variable: 'slackHook')]) {
                    config.slack.frontend_hook = slackHook
                }

                repository = [
                    'address': scm.getUserRemoteConfigs()[0].getUrl(),
                    'source_branch': scm.getBranches()[0].toString(),
                    'target_branch': scm.getBranches()[0].toString(),
                    'credentials': config.bitbucket.ssh_credentials
                ]

                repo_name = repository.address.split('/')[4].replace('.git', '')
                app_name = repo_name.replaceAll("_|\\.", "-")
                info = "*${repo_name}*: PROD deploy\n\nVersion: *${params.version}*\nJob URL: ${env.BUILD_URL}\nStatus: "
            }

            try {
                stage('Checkout') {
                    try {
                        checkoutBitbucket(repository, false)
                    } catch (checkoutError) {
                        log.error("Checkout Failed")
                        info += ":x: checkout faled"
                        throw checkoutError
                    }

                    log.info("Checked out branch: ${params.version}")
                    manager.addBadge('orange-square.png', "Version #${params.version}", params.version)
                }

                stage('Check image') {
                    image = "${config.docker_registry.host}/${config.docker_registry.dir}/${repo_name}/${params.package}:${version}"
                    log.info("Pull image ${image}")

                    docker.withRegistry("https://${config.docker_registry.host}", config.docker_registry.credentials) {
                        try {
                            sh(script: "docker pull ${image}", returnStatus: true)
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
                //publishToSlack(config.slack.platform_hook, info)
                throw e
            }

            info += ":ok_hand:"
            //publishToSlack(config.slack.platform_hook, info)
        }
    }
}
