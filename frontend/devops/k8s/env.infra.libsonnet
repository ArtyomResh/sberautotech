{
  app_name: 'sberautotech-ru-frontend',
  app_port: 8080,
  domain: 'sberautotech.ru',
  deploy_timeout: 300,
  service_account: 'infra-sa',
  registry_secret_name: 'docker-registries',
  history_limit: 5,

  configmaps: {
    [$.app_name]: {
      'nginx-conf': |||
          resolver 10.10.0.162 10.10.0.41;

          server {
              listen 8080;

              server_name sberautotech.ru;
              charset utf-8;

              gzip on;
              gzip_disable "msie6";
              gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript;
              client_max_body_size 10M;

              location / {
                  root   /usr/share/nginx/html;
                  try_files $uri $uri/index.html /index.html;
              }

              location /form {
                  proxy_pass https://sberautotech-backend.int.sbauto.tech;
              }

              location /review {
                  proxy_pass https://sberautotech-backend.int.sbauto.tech;
              }
          }
      |||
    }
  },

  deployments: {
    [$.app_name]: {
      replicas: 3,
      anti_affinity: false,
      volumes: [
        { name: 'nginx-conf', type: 'configmap', items: [{ key: 'nginx-conf', path: 'default.conf' }] }
      ],
      run_as_user: 101,
      expose: {
        [$.app_name + '-kong']: {
          ports: [
            { name: $.app_name, port: $.app_port }
          ],
          kong_plugins: ['prometheus'],
        }
      },
      init_containers: [],
      containers: [
        {
          name: $.app_name,
          command: [],
          args: [],
          requests: { cpu: '50m', memory: '50Mi' },
          limits: { cpu: '500m', memory: '100Mi' },
          ports: [ $.app_port ],
          mounts: [
            { name: 'nginx-conf', path: '/etc/nginx/conf.d/default.conf', subpath: 'default.conf', ro: true }
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
      class: 'kong-public',
      host: $.domain,
      tls: true,
      strip_path: false,
      cert_secret: 'sberautotech-wc-cert',
      paths: [
        { path: '/', service: $.app_name + '-kong', port: $.app_port }
      ]
    }
  }
}
