const Family = require("../models/family.model");
const User = require("../models/user.model");

const generateFamilyCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

exports.createFamily = async (req, res) => {
  console.log(req.body);
  try {
    const { familyName } = req.body;
    const userId = req.body.id; // Récupérer l'ID de l'utilisateur depuis le token JWT

    // Générer un code de famille unique
    const familyCode = generateFamilyCode();

    // Créer la nouvelle famille et ajouter l'utilisateur en tant que membre fondateur
    const newFamily = new Family({
      familyName,
      code: familyCode,
      members: [userId], // Ajouter l'utilisateur comme premier membre
    });

    // Sauvegarder la famille dans la base de données
    await newFamily.save();

    // Mettre à jour l'utilisateur pour associer la famille
    await User.findByIdAndUpdate(userId, { family: newFamily._id });

    res
      .status(201)
      .json({ message: "Famille créée avec succès", family: newFamily });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la famille", error });
  }
};

exports.getAllFamilies = async (req, res) => {
  try {
    const families = await Family.find().populate("members");
    res.status(200).json(families);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des familles", error });
  }
};

exports.getFamilyById = async (req, res) => {
  try {
    const { id } = req.params;
    const family = await Family.findById(id).populate("members");

    if (!family) {
      return res.status(404).json({ message: "Famille non trouvée" });
    }

    res.status(200).json(family);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la famille", error });
  }
};

exports.updateFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const { familyName, code, members } = req.body;

    const family = await Family.findByIdAndUpdate(
      id,
      { familyName, code, members, updatedAt: Date.now() },
      { new: true }
    ).populate("members");

    if (!family) {
      return res.status(404).json({ message: "Famille non trouvée" });
    }

    res
      .status(200)
      .json({ message: "Famille mise à jour avec succès", family });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la famille", error });
  }
};

exports.deleteFamily = async (req, res) => {
  try {
    const { id } = req.params;

    const family = await Family.findByIdAndDelete(id);

    if (!family) {
      return res.status(404).json({ message: "Famille non trouvée" });
    }

    res.status(200).json({ message: "Famille supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la famille", error });
  }
};

exports.getFamilyMembers = async (req, res) => {
  try {
    const { id } = req.params; // ID de la famille passé dans l'URL

    // Chercher la famille par ID et peupler les membres
    const family = await Family.findById(id).populate("members");

    if (!family) {
      return res.status(404).json({ message: "Famille non trouvée" });
    }

    // Retourner les membres de la famille
    res.status(200).json(family.members);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des membres de la famille",
      error,
    });
  }
};
