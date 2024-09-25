const mongoose = require("mongoose");

const EdgeSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true },
    relationshipType: {
      type: String,
      enum: ["parent", "child", "spouse", "sibling"],
      required: true,
    },
  },
  { timestamps: true }
); // Utilisation des timestamps automatiques

module.exports = mongoose.model("Edge", EdgeSchema);
