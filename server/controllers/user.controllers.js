const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      password,
      profilePicture,
      description,
      age,
      gallery,
      family,
    } = req.body;
    const newUser = new User({
      username,
      name,
      email,
      password,
      profilePicture,
      description,
      age,
      gallery,
      family,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

exports.getMe = async (req, res) => {
  // Récupérer le token depuis les en-têtes de la requête
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token non fourni ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Récupérer l'utilisateur depuis la base de données
    const user = await User.findById(decoded.id).exec();

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Renvoyer les informations de l'utilisateur
    res.status(200).json({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      age: user.age,
      description: user.description,
      family: user.family,
      gallery: user.gallery,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    res.status(401).json({ message: "Token invalide" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password, profilePicture },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};
