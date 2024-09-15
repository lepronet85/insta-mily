require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const nodeRoutes = require("./routes/node.routes");
const edgeRoutes = require("./routes/edge.routes");
const galleryRoutes = require("./routes/gallery.routes");
const familyRoutes = require("./routes/family.routes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/nodes", nodeRoutes);
app.use("/api/edges", edgeRoutes);
app.use("/api/families", familyRoutes);
app.use("/api/galleries", galleryRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.listen(5000, () => {
  console.log("Server started successfully");
});
