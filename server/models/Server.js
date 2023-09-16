const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiPath = "/api";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPath + "/login", require("../routes/login"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
