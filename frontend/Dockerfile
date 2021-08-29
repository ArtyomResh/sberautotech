ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}/node:14.16-buster-slim as builder

WORKDIR /home/builder

COPY frontend .

ARG BACKEND_API_URL
ENV GATSBY_API_URL $BACKEND_API_URL

RUN yarn
RUN yarn build

FROM ${DOCKER_REGISTRY}/nginx-unprivileged:1.20.1-alpine

COPY --from=builder /home/builder/public /usr/share/nginx/html
