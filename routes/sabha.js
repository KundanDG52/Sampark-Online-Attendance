const express = require("express");
const router = express.Router();
// const  = require("../middleware/validateTokenhandler");

const {
    getsabhas,
  getsabha,
  createsabha,
  updatesabha,
  deletesabha,
} = require("../controllers/sabha");

router.get("/", getsabhas);
router.get("/:id", getsabha);
router.post("/register", createsabha);
router.patch("/:id", updatesabha);
router.delete("/:id", deletesabha);

module.exports = router;
