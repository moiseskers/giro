FROM node:20-slim

WORKDIR /app

COPY dist/giro-frontend/ /app/

RUN npm i -g serve

ENTRYPOINT [ "serve", "-s", "/app" ]
