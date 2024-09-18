const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getMe,
} = require("../controllers/user.controllers");

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), createUser); // Créer un utilisateur
router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers); // Obtenir tous les utilisateurs
router.get("/me", passport.authenticate("jwt", { session: false }), getMe);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserById
); // Obtenir un utilisateur par ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
); // Mettre à jour un utilisateur
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
); // Supprimer un utilisateur

module.exports = router;
