const mongoose = require("mongoose");
// const Bhulku = require("../models/bhulku");

const sabhaschema = new mongoose.Schema(
  {
    sabha_name: { type: String, require: true },
    sabha_type: { type: String, require: true },
    sabha_location: { type: String, require: true },
    sabha_leader: { type: String, require: true },
    // sabha_leader: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "Bhulku",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sabha", sabhaschema);
