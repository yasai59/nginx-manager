const jwt = require("jsonwebtoken");
const fs = require("fs");

const verifyJWT = (token) => {
  try {
    const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

    jwt.verify(token, config.secretKey);

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  verifyJWT,
};
