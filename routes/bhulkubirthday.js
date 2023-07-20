const express = require("express");
const router = express.Router();
const auth = require("../middleware/validateTokenhandler");


const { bydate, bymonth, byrange } = require("../controllers/bhulkubirthday");

router.get("/day",auth, bydate);
router.get("/month",auth, bymonth);
router.get("/range",auth, byrange);

module.exports = router;
