const mongoose = require("mongoose");

const EdgeSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true },
  relationshipType: {
    type: String,
    enum: ["parent", "child", "spouse", "sibling"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Edge", EdgeSchema);
