FROM node:alpine3.18

WORKDIR /web

COPY config/package*.json /web
RUN npm install

COPY config/modules/* /web

EXPOSE 49153
EXPOSE 3000

COPY config/run_dev.sh /web/run_dev.sh

CMD ["./run_dev.sh"]