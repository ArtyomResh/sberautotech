ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}/node:14.16-buster-slim as builder

WORKDIR /home/builder

COPY frontend .

ARG BACKEND_API_URL
ENV API_URL $BACKEND_API_URL

RUN yarn
RUN yarn build

FROM ${DOCKER_REGISTRY}/nginx:1.19.5-alpine

COPY --from=builder /home/builder/public /usr/share/nginx/html

RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chown -R nginx:nginx /var/log/nginx/ \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /usr/share/nginx/html

USER nginx
