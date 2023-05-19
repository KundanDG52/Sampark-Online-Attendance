const express = require("express");
const router = express.Router();
const auth = require("../middleware/validateTokenhandler");
const {
  createuser,
  loginuser,
  getusers,
  getuser,
  deleteuser,
} = require("../controllers/user");

router.post("/signup", createuser);
router.post("/login", loginuser);
router.get("/", auth, getusers);
router.get("/:id", auth, getuser);
router.delete("/:id", auth, deleteuser);

module.exports = router;
