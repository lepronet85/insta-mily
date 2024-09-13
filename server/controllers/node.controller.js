const Node = require("../models/node.models");

const NodeController = async (req, res) => {
  try {
    const nodes = await Node.find().populate("user", "username email");
    res.json(nodes);
  } catch {
    res.status(500).json({
      message: "Erreur lors de la récupération des nœuds",
      error: err.message,
    });
  }
};

module.exports = NodeController;
