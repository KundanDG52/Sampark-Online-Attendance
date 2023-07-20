const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    //   _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    user_type: { type: String, enum:["admin","sabhaleader"]},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userschema);
