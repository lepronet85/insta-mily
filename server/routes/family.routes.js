const FamilyController = require("../controllers/family.controller");

const express = require("express");
const router = express.Router();

router.get("/", FamilyController);

module.exports = router;
