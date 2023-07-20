const express = require("express");
const router = express.Router();
const auth = require("../middleware/checkForAdmin");
const adminauth = require("../middleware/checkForAdmin");


const {
  getbhulku,
  createbhulku,
  updatebhulku,
  deletebhulku,
  getbhulkus,
} = require("../controllers/bhulku");

router.get("/", auth, getbhulkus);
router.get("/:id", auth, getbhulku);
router.post("/", auth, createbhulku);
router.patch("/:id", auth, updatebhulku);
router.delete("/:id", adminauth, deletebhulku);

module.exports = router;
