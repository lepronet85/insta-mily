const GalleryController = require("../controllers/gallery.controller");

const express = require("express");
const router = express.Router();

router.get("/", GalleryController);

module.exports = router;
