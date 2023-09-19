const jwt = require("jsonwebtoken");
const { getConfig } = require("./getConfig");

const generateJWT = (user) => {
  const config = getConfig();
  const token = jwt.sign(
    {
      user,
    },
    config.secretKey,
    { expiresIn: "1d", algorithm: "RS256" }
  );
  return token;
};

module.exports = {
  generateJWT,
};
