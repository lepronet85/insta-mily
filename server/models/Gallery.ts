const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photos: [
    {
      url: String,
      description: String,
      dateAdded: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Gallery", GallerySchema);
