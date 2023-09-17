const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginPost = (req, res) => {
  // we read the config file for the user and password
  const config = JSON.parse(fs.readFileSync("./config.json"));
  // now we compare the user and password with the ones in the config file
  const { user, password } = req.body;

  if (!config.setup) {
    return res.status(500).json({
      ok: false,
      msg: "Setup has not been done",
    });
  }

  if (user !== config.user || !bcrypt.compareSync(password, config.password)) {
    return res.status(400).json({
      ok: false,
      msg: "User or password are incorrect",
    });
  }

  // we generate the JWT
  const token = jwt.sign(
    {
      user,
    },
    config.secretKey,
    { expiresIn: "1d", algorithm: "RS256" }
  );
  // if everything is ok, we return a success message with the JWT:D

  res.json({
    ok: true,
    msg: "loginPost",
    token,
  });
};

module.exports = {
  loginPost,
};
