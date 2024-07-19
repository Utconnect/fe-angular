FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
ARG APP_NAME
RUN mkdir -p /app
WORKDIR /app
COPY ["decorate-angular-cli.js", "package*.json", "pnpm-lock.yaml", "/app/"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . /app
RUN npx nx build ${APP_NAME} --configuration=production --base-href /${APP_NAME}/

FROM nginx:1.27-alpine
ARG APP_NAME

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/apps/${APP_NAME} /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
