# Dockerfile.io

FROM node:22-alpine

WORKDIR /app

COPY ./io/package*.json ./
RUN npm install

COPY ./lib ./lib
COPY ./io ./io

WORKDIR /app/io

RUN npm run build

CMD ["npm", "start"]
