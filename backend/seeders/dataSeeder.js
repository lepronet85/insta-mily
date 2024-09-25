const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { createUsers } = require("./user.seed");
const { createNodes } = require("./node.seed");
const { createEdges } = require("./edge.seed");
const { createFamilies } = require("./family.seed");
const { createGalleries } = require("./gallery.seed");

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connexion à la base de données MongoDB
    await mongoose.connect(process.env.DATABASE_URL, {});
    console.log("Connecté à MongoDB");

    // Créer des utilisateurs
    const users = await createUsers();

    // Créer des nœuds pour chaque utilisateur
    const nodes = await createNodes(users);

    // Créer des relations (edges) entre les nœuds
    await createEdges(nodes);

    // Créer des familles
    await createFamilies(users);

    // Créer des galeries de photos pour chaque utilisateur
    await createGalleries(users);

    console.log("Données de test créées avec succès !");
  } catch (err) {
    console.error("Erreur lors du remplissage de la base de données:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
