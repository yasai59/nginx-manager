const { Router } = require("express");
const { check } = require("express-validator");
const {
  sitesGet,
  sitesPost,
  sitesDelete,
  sitesPut,
} = require("../controllers/sites");
const { verifyToken } = require("../middlewares/verifyToken");
const { validarCampos } = require("../helpers/validarCampos");

const router = Router();

router.get("/", [verifyToken], sitesGet);

router.post(
  "/",
  [
    verifyToken,
    check("title", "the name is required").notEmpty(),
    check("url", "the url is required").notEmpty(),
    check("type", "the type is required").notEmpty(),
    validarCampos,
  ],
  sitesPost
);

router.delete(
  "/",
  [verifyToken, check("id", "the id is required").notEmpty(), validarCampos],
  sitesDelete
);

router.put(
  "/",
  [
    verifyToken,
    check("uuid", "the uuid is required").notEmpty(),
    validarCampos,
  ],
  sitesPut
);

module.exports = router;
