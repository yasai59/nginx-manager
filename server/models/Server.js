const express = require("express");
const cors = require("cors");
const { verifyJWT } = require("../helpers/verifyJWT");

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
    this.app.use(this.apiPath + "/setup", require("../routes/setup"));
    this.app.use(this.apiPath + "/sites", require("../routes/sites"));

    // Verify token
    this.app.get(this.apiPath + "/verifyToken", (req, res) => {
      const { token } = req.body;
      res.json({
        valid: verifyJWT(token),
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
