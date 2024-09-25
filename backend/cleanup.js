require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("connected", async () => {
  console.log("Connexion à MongoDB réussie.");
  await runCleanup();
  mongoose.connection.close();
});

mongoose.connection.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB:", err);
});

// Supprimer toutes les collections de la base de données
const clearDatabase = async () => {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  for (const collection of collections) {
    try {
      await db.collection(collection.name).deleteMany({});
      console.log(`Collection ${collection.name} supprimée.`);
    } catch (err) {
      console.error(
        `Erreur lors de la suppression de la collection ${collection.name}:`,
        err
      );
    }
  }
};

// Supprimer tous les fichiers du dossier 'uploads'
const clearUploads = () => {
  const uploadsDir = path.join(__dirname, "uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Erreur lors de la lecture du dossier uploads:", err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(
            `Erreur lors de la suppression de l'image ${file}:`,
            err
          );
        } else {
          console.log(`Image ${file} supprimée.`);
        }
      });
    }
  });
};

// Exécuter le nettoyage
const runCleanup = async () => {
  try {
    await clearDatabase();
    clearUploads();
    console.log("Nettoyage complet.");
  } catch (err) {
    console.error("Erreur lors du nettoyage:", err);
  }
};
