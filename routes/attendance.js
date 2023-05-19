const express = require("express");
const router = express.Router();

const {
  createAttendance,
  getAttendance,
  updateAttendancebyid,
  deleteAttendance,
  updateAttendancebydateandsabha
} = require("../controllers/attedance");

router.get("/search", getAttendance);
router.post("/newattedance", createAttendance);
router.patch("/:id", updateAttendancebyid);
router.patch("/",updateAttendancebydateandsabha);
router.delete("/:id", deleteAttendance);

module.exports = router;
