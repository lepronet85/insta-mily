import {
  loginController,
  registerController,
} from "../controllers/auth.controllers";

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
