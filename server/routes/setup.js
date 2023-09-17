const { Router } = require("express");
const { setupPost, setupGet } = require("../controllers/setup");

const router = Router();

router.get("/", setupGet);

router.post("/", setupPost);
