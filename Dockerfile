FROM node:10.23-alpine3.11
ARG APP_ENV=prod
ENV APP_ENV=${APP_ENV}

WORKDIR /app
COPY . .

RUN if [ ${APP_ENV} = "prod" ]; then \
    mv .env.prod .env; \
else \
    mv .env.dev .env; \
fi

# install dependencies
RUN apk add --no-cache \
    libtool \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm
RUN source .env && yarn install && yarn cache clean
RUN source .env && yarn build

ENTRYPOINT yarn start