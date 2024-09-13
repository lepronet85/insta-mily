import GalleryController from "../controllers/gallery.controller";

const express = require("express");
const router = express.Router();

router.get("/", GalleryController);

module.exports = router;
