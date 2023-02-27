FROM node:alpine

RUN mkdir -p /srv/api
WORKDIR /srv/api

ENV REFRESH_COUNT 0

# ESBuild is platform specific
COPY ./. ./
RUN rm -rf ./node_modules

ENV NODE_ENV development
RUN corepack pnpm install
ENV NODE_ENV production

CMD corepack pnpm start
