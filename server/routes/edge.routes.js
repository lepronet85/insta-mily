const {
  getAllEdges,
  getEdgeById,
  updateEdge,
  createEdge,
  deleteEdge,
  deleteNodeEdges,
} = require("../controllers/edge.controllers");

const express = require("express");
const router = express.Router();

// Routes CRUD pour les edges
router.post("/", createEdge); // Créer un edge
router.get("/", getAllEdges); // Obtenir tous les edges
router.get("/:id", getEdgeById); // Obtenir un edge par ID
router.put("/:id", updateEdge); // Mettre à jour un edge
router.delete("/:id", deleteEdge); // Supprimer un edge
router.delete("/byNode/:nodeId", deleteNodeEdges);

module.exports = router;
