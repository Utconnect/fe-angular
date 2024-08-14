FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
ARG APP_NAME
ARG BUILD_ENV
RUN mkdir -p /app/apps /app/libs
WORKDIR /app
COPY ["decorate-angular-cli.js", "package*.json", "pnpm-lock.yaml", "/app/"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ["nx.json", "tsconfig.base.json", "/app/"]
COPY ./apps/${APP_NAME} /app/apps/${APP_NAME}
COPY ./libs/auth /app/libs/auth
COPY ./libs/shared /app/libs/shared
COPY ./libs/${APP_NAME} /app/libs/${APP_NAME}

RUN chmod +x replace-env.sh
RUN ./.ci/replace-env.sh

RUN npx nx build ${APP_NAME} --configuration=${BUILD_ENV} --base-href /${APP_NAME}/

FROM nginxinc/nginx-unprivileged:1.27-alpine
ARG APP_NAME

COPY --from=build /app/dist/apps/${APP_NAME} /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
