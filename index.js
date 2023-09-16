// Configure the Environment variables and start the server
require("./server/helpers/configurator").configure();

const Server = require("./server/models/Server");

const server = new Server();

server.listen();
