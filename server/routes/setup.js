const { Router } = require("express");
const { check } = require("express-validator");

const { setupPost, setupGet } = require("../controllers/setup");
const { validarCampos } = require("../helpers/validarCampos");

const router = Router();
// see if setup has been done
router.get("/", setupGet);

// do the setup
router.post(
  "/",
  [
    check("user", "an username").notEmpty(),
    check("password", "a password is required").notEmpty(),
    validarCampos,
  ],
  setupPost
);

module.exports = router;
