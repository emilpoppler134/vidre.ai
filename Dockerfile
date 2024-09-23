# syntax=docker/dockerfile:1

# Use node image for base image for all stages.
FROM --platform=linux/amd64 node:lts-alpine

# Set working directory for all build stages.
WORKDIR /usr/src/frontend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]