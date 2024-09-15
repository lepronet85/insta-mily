const {
  getAllGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controller");

const express = require("express");
const router = express.Router();

router.post("/galleries", createGallery); // Créer une galerie
router.get("/galleries", getAllGalleries); // Obtenir toutes les galeries
router.get("/galleries/:id", getGalleryById); // Obtenir une galerie par ID
router.put("/galleries/:id", updateGallery); // Mettre à jour une galerie
router.delete("/galleries/:id", deleteGallery); // Supprimer une galerie

module.exports = router;
