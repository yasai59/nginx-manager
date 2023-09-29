const { Router } = require("express");
const { filesPost, filesDelete } = require("../controllers/files");
const { verifyToken } = require("../middlewares/verifyToken");
const { validarCampos } = require("../helpers/validarCampos");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    verifyToken,
    check("id").notEmpty(),
    check("files").notEmpty(),
    validarCampos,
  ],
  filesPost
);

router.delete(
  "/",
  [verifyToken, check("id").notEmpty(), validarCampos],
  filesDelete
);

module.exports = router;
