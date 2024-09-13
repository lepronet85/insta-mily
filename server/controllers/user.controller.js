const User = require("../models/user.model");

const UserController = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: err.message,
    });
  }
};

module.exports = UserController;
