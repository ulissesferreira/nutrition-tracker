FROM node:14.4-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8080