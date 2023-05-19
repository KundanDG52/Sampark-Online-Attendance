const express = require("express");
const router = express.Router();
const auth = require("../middleware/validateTokenhandler");

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
router.delete("/:id", auth, deletebhulku);

module.exports = router;
