const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");
const connectedDb = require("./common/db");
connectedDb();

const app = express();
app.use(express.json());

const bhulkuroutes = require("./routes/bhulku");
const attedanceroutes = require("./routes/attendance");
const userroutes = require("./routes/user");
const sabharoutes = require("./routes/sabha");
app.use(cors());
app.use("/bhulku", bhulkuroutes);
app.use("/attendance", attedanceroutes);
app.use("/user", userroutes);
app.use("/sabha", sabharoutes);
app.use(errorHandler);

module.exports = app;
