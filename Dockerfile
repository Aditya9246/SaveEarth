FROM node:20-slim

WORKDIR /usr/src/app

ENV TRANSFORMERS_CACHE=/usr/src/app/models
ENV TRANSFORMERS_ALLOW_REMOTE=true
ENV TRANSFORMERS_LOCAL_FILES_ONLY=false

RUN mkdir -p /usr/src/app/models

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]