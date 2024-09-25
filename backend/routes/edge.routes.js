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
const passport = require("passport");

// Routes CRUD pour les edges
router.post("/", passport.authenticate("jwt", { session: false }), createEdge); // Créer un edge
router.get("/", passport.authenticate("jwt", { session: false }), getAllEdges); // Obtenir tous les edges
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getEdgeById
); // Obtenir un edge par ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateEdge
); // Mettre à jour un edge
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteEdge
); // Supprimer un edge
router.delete(
  "/byNode/:nodeId",
  passport.authenticate("jwt", { session: false }),
  deleteNodeEdges
);

module.exports = router;
