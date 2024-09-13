const Family = require("../models/family.model");

const FamilyController = async (req, res) => {
  try {
    const families = await Family.find().populate("members", "username email");
    res.json(families);
  } catch {
    res.status(500).json({
      message: "Erreur lors de la récupération des familles",
      error: err.message,
    });
  }
};

module.exports = FamilyController;
