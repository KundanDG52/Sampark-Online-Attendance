const express = require("express");
const router = express.Router();
// const  = require("../middleware/validateTokenhandler");

//sabha router handlers//
const {
    getsabhas,
  getsabha,
  createsabha,
  updatesabha,
  deletesabha,
} = require("../controllers/sabha");

//sabha http requests //
router.get("/", getsabhas);
router.get("/:id", getsabha);
router.post("/register", createsabha);
router.patch("/:id", updatesabha);
router.delete("/:id", deletesabha);

module.exports = router;
