FROM node:16

MAINTAINER Atri Hegde <iamatrihegde@outlook.com>

RUN node -v

RUN npm -v

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn dev --host
