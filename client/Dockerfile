FROM node:21-alpine

WORKDIR /App

COPY api components public src ./
COPY jsconfig.json next.config.js package.json ./
COPY package-lock.json postcss.config.js tailwind.config.js ./

RUN npm install
CMD ["npm","run","dev"]