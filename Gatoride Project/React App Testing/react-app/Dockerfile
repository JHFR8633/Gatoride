# load node base
FROM node:18-alpine

# setup working directory
WORKDIR /app

# copy the packages file to directory
COPY package.json /app

# install dependencies
RUN npm install

# copy other files
COPY . .

# expose the port
EXPOSE 3000

# start program
CMD ["npm", "start"]