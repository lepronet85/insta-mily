const Node = require("../models/node.models");

const createNodes = async (users) => {
  try {
    const nodes = users.map((user, index) => ({
      user: user._id,
      name: user.username,
      dateOfBirth: new Date(1990 + index, 0, 1),
      gender: index % 2 === 0 ? "male" : "female",
    }));

    const createdNodes = await Node.insertMany(nodes);
    console.log("Nœuds créés pour les utilisateurs:", createdNodes);
    return createdNodes;
  } catch (err) {
    console.error("Erreur lors de la création des nœuds:", err);
  }
};

module.exports = { createNodes };
