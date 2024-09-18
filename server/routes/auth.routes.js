const {
  loginController,
  registerController,
} = require("../controllers/auth.controllers");

const express = require("express");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
