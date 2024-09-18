require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
require("./config/passport")(passport);

const userRoutes = require("./routes/user.routes");
const nodeRoutes = require("./routes/node.routes");
const edgeRoutes = require("./routes/edge.routes");
const galleryRoutes = require("./routes/gallery.routes");
const familyRoutes = require("./routes/family.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Configuration de multer pour enregistrer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/nodes", nodeRoutes);
app.use("/api/edges", edgeRoutes);
app.use("/api/families", familyRoutes);
app.use("/api/galleries", galleryRoutes);
app.use("/api/auth/", authRoutes);
// Route pour uploader une image
app.post("/api/upload_file", upload.single("image"), (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    res.json({
      message: "Image uploadée avec succès",
      file: req.file,
      path: filePath,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
});

app.post("/api/upload_files", upload.array("images", 10), (req, res) => {
  try {
    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);

    res.json({
      message: "Images uploadées avec succès",
      files: req.files,
      paths: filePaths, // Chemins des fichiers pour les utiliser dans le frontend
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.listen(5000, () => {
  console.log("Server started successfully");
});
