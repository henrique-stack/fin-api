FROM node:alpine

WORKDIR /database

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 5432

CMD [ "yarn", "dev"]