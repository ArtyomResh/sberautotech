{
  app_name: 'sberautotech-ru-backend',
  app_port: 1337,
  domain: 'sberautotech-backend.int.sbauto.tech',
  deploy_timeout: 300,
  service_account: 'infra-sa',
  registry_secret_name: 'docker-registries',
  history_limit: 5,

  deployments: {
    [$.app_name]: {
      replicas: 1,
      anti_affinity: false,
      volumes: [
        { name: 'envs', type: 'emptydir' }
      ],
      vault: {
        role: $.service_account,
        url: 'https://vault.int.sbauto.tech:8200',
        secrets_path: 'k8s/infra'
      },
      run_as_user: 1001,
      expose: {
        [$.app_name + '-kong']: {
          ports: [
            { name: $.app_name, port: $.app_port }
          ],
          kong_plugins: ['prometheus'],
        }
      },
      init_containers: [
        {
          name: 'vault',
          image_path: 'infra/vault-injector:0.1.1',
          requests: { cpu: '60m', memory: '100Mi' },
          mounts: [
            { name: 'envs', path: '/vault', ro: false }
          ],
          envs: [
            { VAULT_APP: "metadata.labels['app']" },
            { VAULT_PATH: "metadata.annotations['vault.path']" },
            { VAULT_ROLE: "metadata.annotations['vault.role']" },
            { VAULT_URL: "metadata.annotations['vault.url']" },
            { VAULT_SECRETS_PATH: "metadata.annotations['vault.secrets_path']" }
          ],
        }
      ],
      containers: [
        {
          name: $.app_name,
          command: [],
          args: [],
          requests: { cpu: '50m', memory: '50Mi' },
          limits: { cpu: '200m', memory: '1Gi' },
          ports: [ $.app_port ],
          mounts: [
            { name: 'envs', path: '/vault', ro: true }
          ],
          envs: [],
          readiness_probe: {
            initialDelaySeconds: 2,
            periodSeconds: 5,
            timeoutSeconds: 2,
            tcpSocket: { port: $.app_port }
          }
        }
      ]
    }
  },

  ingresses: {
    [$.app_name + '-kong']: {
      class: 'kong',
      host: $.domain,
      tls: true,
      strip_path: false,
      paths: [
        { path: '/', service: $.app_name + '-kong', port: $.app_port }
      ]
    }
  },

  certificates: {
    [$.domain]: {
      issuer: 'infra-vault-sbauto',
      secret: 'sberautotech-backend-int-sbauto'
    }
  }
}
