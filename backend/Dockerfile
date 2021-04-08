ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}/node:14.16-buster-slim

WORKDIR /home/runner

COPY backend .

RUN yarn
RUN yarn build:production

ENTRYPOINT [ "/home/runner/docker-entrypoint.sh" ]

CMD ["start"]
