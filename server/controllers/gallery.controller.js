// Créer une galerie pour un utilisateur
exports.createGallery = async (req, res) => {
  try {
    const { user, photos } = req.body;
    const newGallery = new Gallery({ user, photos });
    await newGallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la galerie" });
  }
};

// Lire toutes les galeries
exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().populate("user");
    res.status(200).json(galleries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des galeries" });
  }
};

// Lire une galerie par ID
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id).populate("user");
    if (!gallery) {
      return res.status(404).json({ error: "Galerie non trouvée" });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la galerie" });
  }
};

// Mettre à jour une galerie
exports.updateGallery = async (req, res) => {
  try {
    const { user, photos } = req.body;
    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { user, photos },
      { new: true, runValidators: true }
    );
    if (!updatedGallery) {
      return res.status(404).json({ error: "Galerie non trouvée" });
    }
    res.status(200).json(updatedGallery);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la galerie" });
  }
};

// Supprimer une galerie
exports.deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGallery) {
      return res.status(404).json({ error: "Galerie non trouvée" });
    }
    res.status(200).json({ message: "Galerie supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la galerie" });
  }
};
