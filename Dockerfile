FROM ubuntu:20.04

RUN apt update

RUN apt install nginx -y

RUN apt install curl -y

RUN apt install nodejs -y

RUN apt install npm -y

RUN npm cache clean -f 

RUN npm i -g n

RUN n 18.17.1

RUN npm i -g nodemon

RUN apt install build-essential -y

RUN npm i -g npm@latest

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm i

EXPOSE 80
CMD ["npm", "start"]