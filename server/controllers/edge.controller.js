const Edge = require("../models/edge.model");

// Créer un edge
exports.createEdge = async (req, res) => {
  try {
    const { from, to, relationshipType } = req.body;
    const newEdge = new Edge({ from, to, relationshipType });
    await newEdge.save();
    res.status(201).json(newEdge);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du edge" });
  }
};

// Lire tous les edges
exports.getAllEdges = async (req, res) => {
  try {
    const edges = await Edge.find().populate("from to");
    res.status(200).json(edges);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des edges" });
  }
};

// Lire un edge par ID
exports.getEdgeById = async (req, res) => {
  try {
    const edge = await Edge.findById(req.params.id).populate("from to");
    if (!edge) {
      return res.status(404).json({ error: "Edge non trouvé" });
    }
    res.status(200).json(edge);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du edge" });
  }
};

// Mettre à jour un edge
exports.updateEdge = async (req, res) => {
  try {
    const { from, to, relationshipType } = req.body;
    const updatedEdge = await Edge.findByIdAndUpdate(
      req.params.id,
      { from, to, relationshipType },
      { new: true, runValidators: true }
    );
    if (!updatedEdge) {
      return res.status(404).json({ error: "Edge non trouvé" });
    }
    res.status(200).json(updatedEdge);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du edge" });
  }
};

// Supprimer un edge
exports.deleteEdge = async (req, res) => {
  try {
    const deletedEdge = await Edge.findByIdAndDelete(req.params.id);
    if (!deletedEdge) {
      return res.status(404).json({ error: "Edge non trouvé" });
    }
    res.status(200).json({ message: "Edge supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du edge" });
  }
};
