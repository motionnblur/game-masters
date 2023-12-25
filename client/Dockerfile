FROM node:21-alpine

WORKDIR /App

COPY package*.json ./
COPY . .

RUN npm install
RUN npm install @reduxjs/toolkit
RUN npm install react-redux

CMD ["npm","run","dev"]
