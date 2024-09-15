const Node = require("../models/node.models");

// Créer un node
exports.createNode = async (req, res) => {
  try {
    const { user, name, dateOfBirth, dateOfDeath, gender, relationships } =
      req.body;
    const newNode = new Node({
      user,
      name,
      dateOfBirth,
      dateOfDeath,
      gender,
      relationships,
    });
    await newNode.save();
    res.status(201).json(newNode);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du node" });
  }
};

// Lire tous les nodes
exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find().populate("user relationships");
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des nodes" });
  }
};

// Lire un node par ID
exports.getNodeById = async (req, res) => {
  try {
    const node = await Node.findById(req.params.id).populate(
      "user relationships"
    );
    if (!node) {
      return res.status(404).json({ error: "Node non trouvé" });
    }
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du node" });
  }
};

// Mettre à jour un node
exports.updateNode = async (req, res) => {
  try {
    const { user, name, dateOfBirth, dateOfDeath, gender, relationships } =
      req.body;
    const updatedNode = await Node.findByIdAndUpdate(
      req.params.id,
      { user, name, dateOfBirth, dateOfDeath, gender, relationships },
      { new: true, runValidators: true }
    );
    if (!updatedNode) {
      return res.status(404).json({ error: "Node non trouvé" });
    }
    res.status(200).json(updatedNode);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du node" });
  }
};

// Supprimer un node
exports.deleteNode = async (req, res) => {
  try {
    const deletedNode = await Node.findByIdAndDelete(req.params.id);
    if (!deletedNode) {
      return res.status(404).json({ error: "Node non trouvé" });
    }
    res.status(200).json({ message: "Node supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du node" });
  }
};
