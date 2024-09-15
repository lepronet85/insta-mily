const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.get("/", UserController);

module.exports = router;
