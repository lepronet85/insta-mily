const Edge = require("../models/edge.model");

const EdgeController = async (req, res) => {
  try {
    const edges = await Edge.find().populate("from to", "name");
    res.json(edges);
  } catch {
    res.status(500).json({
      message: "Erreur lors de la récupération des relations",
      error: err.message,
    });
  }
};

module.exports = EdgeController;
