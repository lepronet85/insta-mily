const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  dateOfDeath: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  relationships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Edge" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Node", NodeSchema);
