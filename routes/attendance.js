const express = require("express");
const router = express.Router();
const auth = require("../middleware/checkForAdmin");
const adminauth = require("../middleware/checkForAdmin");

const {
  createAttendance,
  getAttendance,
  updateAttendancebyid,
  deleteAttendance,
  updateAttendancebydateandsabha,
} = require("../controllers/attedance");

router.get("/search", auth, getAttendance);
router.post("/newattedance", auth, createAttendance);
router.patch("/:id", adminauth, updateAttendancebyid);
router.patch("/", adminauth, updateAttendancebydateandsabha);
router.delete("/:id", adminauth, deleteAttendance);

module.exports = router;
