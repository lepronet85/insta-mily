const {
  getAllNodes,
  getNodeById,
  createNode,
  updateNode,
  deleteNode,
} = require("../controllers/node.controllers");

const express = require("express");
const router = express.Router();

router.post("/", createNode); // Créer un node
router.get("/", getAllNodes); // Obtenir tous les nodes
router.get("/:id", getNodeById); // Obtenir un node par ID
router.put("/:id", updateNode); // Mettre à jour un node
router.delete("/:id", deleteNode); // Supprimer un node

module.exports = router;
