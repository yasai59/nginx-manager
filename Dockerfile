FROM ubuntu:20.04

RUN apt update

RUN apt install nginx -y

RUN apt install curl -y

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

RUN nvm install 18.17.1

RUN nvm use 18.17.1

RUN apt install npm -y

RUN npm install -g nodemon

RUN apt install build-essential -y

RUN npm install -g npm@latest

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm install

RUN npm start