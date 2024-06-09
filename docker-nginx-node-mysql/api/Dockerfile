FROM node:21

WORKDIR /app

COPY package.json yarn.lock /

RUN yarn install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
