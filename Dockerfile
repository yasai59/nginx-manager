FROM ubuntu:20.04
# update the repository sources list and install dependencies
RUN apt update
# it's all in separate lines so it's easier to know what's happening when building the image
RUN apt install nginx -y

RUN apt install curl -y

RUN apt install nodejs -y

RUN apt install npm -y

RUN apt install build-essential -y
# update npm and node to the desired version
RUN npm cache clean -f 

RUN npm i -g n

RUN n 18.17.1

RUN npm i -g nodemon

RUN npm i -g npm@10.1.0
# install the application
WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm i

EXPOSE 80
CMD ["npm", "start"]