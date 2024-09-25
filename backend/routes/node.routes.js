const {
  getAllNodes,
  getNodeById,
  createNode,
  updateNode,
  deleteNode,
} = require("../controllers/node.controllers");

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), createNode); // Créer un node
router.get("/", passport.authenticate("jwt", { session: false }), getAllNodes); // Obtenir tous les nodes
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getNodeById
); // Obtenir un node par ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateNode
); // Mettre à jour un node
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteNode
); // Supprimer un node

module.exports = router;
