const fs = require("fs");

const getConfig = () => {
  let config;
  try {
    config = JSON.parse(fs.readFileSync("./files/config.json"));
  } catch (e) {
    config = {};
  }

  return config;
};

module.exports = {
  getConfig,
};
