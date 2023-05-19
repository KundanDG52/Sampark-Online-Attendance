const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    //   _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userschema);
