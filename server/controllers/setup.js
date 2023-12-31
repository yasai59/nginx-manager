const { generateJWT } = require("../helpers/generateJWT");
const { getConfig } = require("../helpers/getConfig");

const setupGet = (req, res) => {
  const config = getConfig();

  res.json({
    setup: !!config.setup,
  });
};

const setupPost = (req, res) => {
  // we read the config file
  const fs = require("fs");
  const keypair = require("keypair");
  const config = getConfig();
  // if setup has been done already, we return an error
  if (config.setup) {
    return res.status(400).json({
      ok: false,
      msg: "Setup has been done already",
    });
  }

  // if not, we do the setup
  const bcrypt = require("bcryptjs");

  const { user, password } = req.body;
  // we encrypt the password
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hash = bcrypt.hashSync(password, salt);
  // we generate the keys for the JWT
  const pair = keypair();
  // we save the config file
  const newConfig = {
    setup: true,
    user,
    password: hash,
    secretKey: pair.private,
  };
  fs.writeFileSync("./files/config.json", JSON.stringify(newConfig));

  const token = generateJWT(user);

  // return a success message :D
  res.json({
    ok: true,
    token,
    user,
  });
};

module.exports = {
  setupGet,
  setupPost,
};
