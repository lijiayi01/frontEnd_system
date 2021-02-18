FROM node:12-alpine

RUN mkdir -p /home/node

COPY .  /home/node

EXPOSE 3000

WORKDIR /home/node

RUN npm install 

CMD ["node", "/home/node/server.js"]