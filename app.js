const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");

//call of database function
const connectedDb = require("./common/db");
connectedDb();

const app = express();

//For body Parsing//
app.use(express.json());

// Routes //
const bhulkuroutes = require("./routes/bhulku");
const attedanceroutes = require("./routes/attendance");
const userroutes = require("./routes/user");
const sabharoutes = require("./routes/sabha");
const birthdayroutes = require("./routes/bhulkubirthday");

//middlewares//
// const corsOption = {
//   origin: ["http://localhost:3001"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
app.use(cors());
app.use("/bhulku", bhulkuroutes);
app.use("/attendance", attedanceroutes);
app.use("/user", userroutes);
app.use("/sabha", sabharoutes);
app.use("/birthday", birthdayroutes);
app.use(errorHandler);

module.exports = app;
