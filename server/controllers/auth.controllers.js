const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const secretOrKey = process.env.JWT_SECRET;

exports.registerController = async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    user = new User({ username, name, email, password });

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ message: "Inscription réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, secretOrKey, { expiresIn: "1h" });

    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
