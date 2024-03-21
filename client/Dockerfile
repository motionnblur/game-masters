FROM node:21-alpine

WORKDIR /App

COPY package*.json ./

RUN npm install @reduxjs/toolkit && npm install react-redux && npm install react-feather
RUN npm install

COPY . .

CMD ["npm","run","dev"]
