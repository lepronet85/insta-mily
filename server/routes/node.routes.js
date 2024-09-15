const NodeController = require("../controllers/node.controller");

const express = require("express");
const router = express.Router();

router.get("/", NodeController);

module.exports = router;
