const {
  getAllGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controllers");

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/galleries",
  passport.authenticate("jwt", { session: false }),
  createGallery
); // Créer une galerie
router.get(
  "/galleries",
  passport.authenticate("jwt", { session: false }),
  getAllGalleries
); // Obtenir toutes les galeries
router.get(
  "/galleries/:id",
  passport.authenticate("jwt", { session: false }),
  getGalleryById
); // Obtenir une galerie par ID
router.put(
  "/galleries/:id",
  passport.authenticate("jwt", { session: false }),
  updateGallery
); // Mettre à jour une galerie
router.delete(
  "/galleries/:id",
  passport.authenticate("jwt", { session: false }),
  deleteGallery
); // Supprimer une galerie

module.exports = router;
