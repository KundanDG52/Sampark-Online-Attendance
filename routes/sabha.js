const express = require("express");
const router = express.Router();
// const  = require("../middleware/validateTokenhandler");
const adminauth = require("../middleware/checkForAdmin");
const auth = require("../middleware/validateTokenhandler");

//sabha router handlers//
const {
  getsabhas,
  getsabha,
  createsabha,
  updatesabha,
  deletesabha,
} = require("../controllers/sabha");

//sabha http requests //
router.get("/", auth, getsabhas);
router.get("/:id", auth, getsabha);
router.post("/register", adminauth, createsabha);
router.patch("/:id", adminauth, updatesabha);
router.delete("/:id", adminauth, deletesabha);

module.exports = router;
