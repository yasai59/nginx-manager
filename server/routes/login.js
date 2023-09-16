const { Router } = require("express");
const { check } = require("express-validator");

const { loginPost } = require("../controllers/login");
const { validarCampos } = require("../helpers/validarCampos");

const router = Router();

router.post(
  "/",
  [
    check("user", "an username or email is required").notEmpty(),
    check("password", "The password is required").notEmpty(),
    validarCampos,
  ],
  loginPost
);

module.exports = router;
