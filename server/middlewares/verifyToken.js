const { request } = require("express");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../helpers/getConfig");

const verifyToken = (req = request, res, next) => {
  const token = req.header("x-token");
  const config = getConfig();

  if (!token) {
    return res.status(401).json({
      msg: "No token provided",
    });
  }

  try {
    const { user } = jwt.verify(token, config.secretKey);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  verifyToken,
};
