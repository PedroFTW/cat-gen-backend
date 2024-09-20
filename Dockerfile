FROM node:current-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev"]