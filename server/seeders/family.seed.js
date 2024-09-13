const Family = require("../models/Family");

// Crée une famille avec certains utilisateurs
const createFamilies = async (users) => {
  try {
    const families = [
      {
        familyName: "Doe Family",
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      { familyName: "Smith Family", members: [users[3]._id, users[4]._id] },
      // Ajoutez d'autres familles si nécessaire
    ];

    const createdFamilies = await Family.insertMany(families);
    console.log("Familles créées:", createdFamilies);
    return createdFamilies;
  } catch (err) {
    console.error("Erreur lors de la création des familles:", err);
  }
};

module.exports = { createFamilies };
