const FamilyController = require("../controllers/family.controllers");

const express = require("express");
const router = express.Router();

router.get("/", FamilyController);

module.exports = router;
