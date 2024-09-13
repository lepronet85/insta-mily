const Edge = require("../models/Edge");

const createEdges = async (nodes) => {
  try {
    const edges = [
      { from: nodes[0]._id, to: nodes[1]._id, relationshipType: "spouse" },
      { from: nodes[0]._id, to: nodes[2]._id, relationshipType: "parent" },
      { from: nodes[1]._id, to: nodes[2]._id, relationshipType: "parent" },
      { from: nodes[3]._id, to: nodes[4]._id, relationshipType: "sibling" },
    ];

    const createdEdges = await Edge.insertMany(edges);
    console.log("Relations créées entre les nœuds:", createdEdges);
    return createdEdges;
  } catch (err) {
    console.error("Erreur lors de la création des relations:", err);
  }
};

module.exports = { createEdges };
