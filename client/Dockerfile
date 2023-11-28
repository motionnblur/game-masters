FROM node:21-alpine

WORKDIR /App

COPY package*.json ./
COPY . .
RUN npm install

CMD ["npm","run","dev"]
