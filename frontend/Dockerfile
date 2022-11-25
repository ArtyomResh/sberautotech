ARG DOCKER_REGISTRY=registry.sberautotech.ru:5574/external/csssr/sberautotech.ru
FROM ${DOCKER_REGISTRY}/node:14.16-buster-slim as builder

WORKDIR /home/builder

COPY frontend .

ARG BACKEND_API_URL
ENV GATSBY_API_URL $BACKEND_API_URL
ENV NODE_EXTRA_CA_CERTS="/etc/ssl/certs/ca-certificates.crt"

RUN yarn config set cafile "/etc/ssl/certs/ca-certificates.crt"

RUN yarn

ARG BUILD_COMMAND=build

RUN yarn ${BUILD_COMMAND}

FROM ${DOCKER_REGISTRY}/nginx-unprivileged:1.20.1-alpine

COPY --from=builder /home/builder/public /usr/share/nginx/html
