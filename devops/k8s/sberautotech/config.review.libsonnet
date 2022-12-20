{
  proxy_port: 8080,
  deploy_timeout: 300,
  service_account: 'fe-dev-sa',
  registry_secret_name: 'docker-registries',
  backend_url: 'https://sberautotech-backend.dev.fe.sbauto.tech',
  taxi_auth_url: 'https://taxi-auth.dev.sd.sbauto.tech',
  history_limit: 1,

  configmaps: {
    'sberautotech-review-nginx-conf': {
      'nginx-conf': |||
          resolver 10.10.0.162 10.10.0.41;

          server {
              listen %(proxy_port)s;

              server_name sberautotech;
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
                  proxy_pass %(backend_url)s;
              }

              location /form/vacancy {
                  proxy_pass %(backend_url)s;
              }

              location /form/contact {
                  proxy_pass %(backend_url)s;
              }

              location /review {
                  proxy_pass %(backend_url)s;
              }

              location /freeSlots {
                  proxy_pass %(backend_url)s;
              }

              location /order {
                  proxy_pass %(backend_url)s;
              }

              location ~ ^/auth-taxi/(.*)$ {
                  proxy_pass %(taxi_auth_url)s/$1$is_args$args;
              }
          }
      ||| % { backend_url: $.backend_url, taxi_auth_url: $.taxi_auth_url, proxy_port: $.proxy_port }
    }
  },

  deployments: {
    [$.app_name + '-ru']: {
      replicas: 1,
      anti_affinity: false,
      volumes: [
        { name: 'nginx-conf', type: 'configmap', configmap_name: 'sberautotech-review-nginx-conf', items: [{ key: 'nginx-conf', path: 'default.conf' }] }
      ],
      run_as_user: 101,
      expose: {
        [$.app_name + '-ru']: {
          ports: [
            { name: $.app_name, port: $.proxy_port }
          ]
        }
      },
      containers: [
        {
          name: $.app_name,
          command: [],
          args: [],
          requests: { cpu: '50m', memory: '50Mi' },
          limits: { cpu: '100m', memory: '50Mi' },
          ports: [ $.proxy_port ],
          mounts: [
            { name: 'nginx-conf', path: '/etc/nginx/conf.d/default.conf', subpath: 'default.conf', ro: true }
          ],
          envs: [],
          readiness_probe: {
            initialDelaySeconds: 2,
            periodSeconds: 5,
            timeoutSeconds: 2,
            tcpSocket: { port: $.proxy_port }
          }
        }
      ]
    },
    [$.app_name + '-en']: {
      replicas: 1,
      anti_affinity: false,
      volumes: [
        { name: 'nginx-conf', type: 'configmap', configmap_name: 'sberautotech-review-nginx-conf', items: [{ key: 'nginx-conf', path: 'default.conf' }] }
      ],
      run_as_user: 101,
      expose: {
        [$.app_name + '-en']: {
          ports: [
            { name: $.app_name, port: $.proxy_port }
          ]
        }
      },
      containers: [
        {
          name: $.app_name,
          version_postfix: '-en',
          command: [],
          args: [],
          requests: { cpu: '50m', memory: '50Mi' },
          limits: { cpu: '100m', memory: '50Mi' },
          ports: [ $.proxy_port ],
          mounts: [
            { name: 'nginx-conf', path: '/etc/nginx/conf.d/default.conf', subpath: 'default.conf', ro: true }
          ],
          envs: [],
          readiness_probe: {
            initialDelaySeconds: 2,
            periodSeconds: 5,
            timeoutSeconds: 2,
            tcpSocket: { port: $.proxy_port }
          }
        }
      ]
    }
  },

  ingresses: {
    [$.app_name + '-ru']: {
      class: 'kong',
      host: $.domain_ru,
      tls: true,
      strip_path: false,
      cert_secret: 'shepherd-review-wc',
      paths: [
        { path: '/', service: $.app_name + '-ru', port: $.proxy_port }
      ]
    },
    [$.app_name + '-en']: {
      class: 'kong',
      host: $.domain_en,
      tls: true,
      strip_path: false,
      cert_secret: 'shepherd-review-wc',
      paths: [
        { path: '/', service: $.app_name + '-en', port: $.proxy_port }
      ]
    }
  }

}
