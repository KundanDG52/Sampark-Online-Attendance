const express = require("express");
const router = express.Router();

const {
  createAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attedance");

router.get("/", getAttendance);
router.post("/newattedance", createAttendance);
router.patch("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
