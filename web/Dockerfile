# Base image
FROM node:latest as build-step

# Create and Set work app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN npm run build

# Stage 2
# pull nginx base image
FROM nginx:1.17.1-alpine

# build file to nginx
COPY --from=build-step /usr/src/app/build /usr/share/nginx/html

# port
EXPOSE 80