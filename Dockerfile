FROM node:14.5.0-alpine
WORKDIR /app

COPY . .

RUN yarn install

EXPOSE $PORT

CMD ["node", "index.js"]
