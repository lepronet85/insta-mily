require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.listen(5000, () => {
  console.log("Server started successfully");
});
