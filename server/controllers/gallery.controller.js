const Gallery = require("../models/gallery.model");

const GalleryController = async (req, res) => {
  try {
    const galleries = await Gallery.find().populate("user", "username email");
    res.json(galleries);
  } catch {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des galeries",
        error: err.message,
      });
  }
};

module.exports = GalleryController;
