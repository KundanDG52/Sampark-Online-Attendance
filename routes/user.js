const express = require("express");
const router = express.Router();
const auth = require("../middleware/validateTokenhandler");
const adminauth = require("../middleware/checkForAdmin");

const {
  createuser,
  loginuser,
  getusers,
  getuser,
  deleteuser,
  newuser,
} = require("../controllers/user");

router.post("/signup", createuser);
router.post("/login", loginuser);
router.get("/", adminauth, getusers);
router.get("/:id", adminauth, getuser); // params request//
router.delete("/:id", adminauth, deleteuser);
router.patch("/newpassword/:id", adminauth, newuser);

module.exports = router;
