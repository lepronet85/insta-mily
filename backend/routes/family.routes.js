const {
  createFamily,
  getAllFamilies,
  getFamilyById,
  updateFamily,
  deleteFamily,
  getFamilyMembers,
} = require("../controllers/family.controllers");

const express = require("express");
const router = express.Router();

router.post("/", createFamily);
router.get("/", getAllFamilies);
router.get("/:id", getFamilyById);
router.put("/:id", updateFamily);
router.delete("/:id", deleteFamily);
router.get("/:id/members", getFamilyMembers);

module.exports = router;
