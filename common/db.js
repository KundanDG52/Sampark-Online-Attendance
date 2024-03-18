const mongoose = require("mongoose");
require("dotenv").config();

// Connecting Database
const connectedDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb://0.0.0.0:27017/", {
      dbName: "sampark",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "Database connected succesfully",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectedDb;
