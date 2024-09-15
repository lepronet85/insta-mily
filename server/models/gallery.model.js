const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    photos: [
      {
        url: { type: String, required: true },
        description: String,
        dateAdded: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
