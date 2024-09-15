const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/", createUser); // Créer un utilisateur
router.get("/", getAllUsers); // Obtenir tous les utilisateurs
router.get("/:id", getUserById); // Obtenir un utilisateur par ID
router.put("/:id", updateUser); // Mettre à jour un utilisateur
router.delete("/:id", deleteUser); // Supprimer un utilisateur

module.exports = router;
