const {
  createFamily,
  getAllFamilies,
  getFamilyById,
  updateFamily,
  deleteFamily,
} = require("../controllers/family.controllers");

const express = require("express");
const router = express.Router();

router.post("/family", createFamily);
router.get("/family", getAllFamilies);
router.get("/family/:id", getFamilyById);
router.put("/family/:id", updateFamily);
router.delete("/family/:id", deleteFamily);
router.get("/family/:id/members", getFamilyMembers);

module.exports = router;
