const mongoose = require("mongoose");
const sabha = require("../models/sabha");

const attendanceschema = new mongoose.Schema(
  {
    sabha: { type: mongoose.SchemaTypes.ObjectId, require: true, ref: "Sabha" },
    // mandal: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   require: true,
    //   ref: "Mandal",
    // },
    sabhadate: { type: Date, require: true }, //sabha date should be unique formate//
    attendees: { type: [mongoose.SchemaTypes.ObjectId], ref: "Bhulku" },
    nonattendees: { type: [mongoose.SchemaTypes.ObjectId], ref: "Bhulku" },
    createdby: { type: mongoose.SchemaTypes.ObjectId, ref: "Bhulku" },
    updatedby: { type: mongoose.SchemaTypes.ObjectId, ref: "Bhulku" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceschema);
