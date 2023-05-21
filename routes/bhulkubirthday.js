const express = require("express");
const router = express.Router();

const { bydate, bymonth, byrange } = require("../controllers/bhulkubirthday");

router.get("/day", bydate);
router.get("/month", bymonth);
router.get("/range", byrange);

module.exports = router;
