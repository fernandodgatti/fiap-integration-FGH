FROM node:lts-alpine as production-stage
ENV NODE_ENV=production

WORKDIR /api

COPY package*.json ./
RUN npm install --production

COPY . .
EXPOSE 3000

CMD [ "node", "app.js" ]