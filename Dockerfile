FROM node:16

RUN node -v

RUN npm -v

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn cache clean

RUN yarn dev --host
