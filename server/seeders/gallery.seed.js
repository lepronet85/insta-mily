const Gallery = require("../models/Gallery");

// Crée des galeries de photos pour chaque utilisateur
const createGalleries = async (users) => {
  try {
    const galleries = users.map((user) => ({
      user: user._id,
      photos: [
        {
          url: "https://example.com/photo1.jpg",
          description: "Photo de famille 1",
        },
        {
          url: "https://example.com/photo2.jpg",
          description: "Photo de famille 2",
        },
      ],
    }));

    const createdGalleries = await Gallery.insertMany(galleries);
    console.log("Galeries créées pour les utilisateurs:", createdGalleries);
    return createdGalleries;
  } catch (err) {
    console.error("Erreur lors de la création des galeries:", err);
  }
};

module.exports = { createGalleries };
