const fs = require("fs");

const getConfig = () => {
  const config = JSON.parse(fs.readFileSync("./files/config.json"));

  return config;
};

module.exports = {
  getConfig,
};
