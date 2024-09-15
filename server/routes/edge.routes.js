const EdgeController = require("../controllers/edge.controller");

const express = require("express");
const router = express.Router();

router.get("/", EdgeController);

module.exports = router;
