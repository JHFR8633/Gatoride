FROM node:latest

RUN mkdir /app
RUN mkdir /app/.next
RUN mkdir app/node_modules

WORKDIR /app

COPY config/package*.json /app
RUN npm install

COPY config/modules/* /app

EXPOSE 49153
EXPOSE 3000

CMD [ "npm", "run", "dev" ]