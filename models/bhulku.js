const mongoose = require("mongoose");

const bhulkuschema = new mongoose.Schema(
  {
    Member_id: { type: Number, require: true },
    sabha_id: {
      type: String,
      enum: ["Andheri", "vile-parle", "santacruz"],
      require: true,
    },
    Reference_Name: { type: String, require: true },
    First_Name: { type: String, require: true },
    Middle_Name: { type: String, require: true },
    Last_Name: { type: String, require: true },
    NickName: { type: String },
    Gender: { type: String, enum: ["Male", "Female"], require: true },
    Date_Of_Birth: { type: Date, require: true, trim: true },
    Address: { type: String, require: true },
    Mobile: { type: Number, require: true },
    Home_Phone: { type: Number },
    Office_Phone: { type: Number },
    Email: { type: String, require: true },
    Educational_Qualification: {
      type: String,
      enum: [
        "Below secondary",
        "Higher Secondary",
        "Diploma",
        "Graduate",
        "Postgradute",
      ],
    },
    Major_Subject: { type: String },
    Educational_Status: { type: String, enum: ["Pursuing", "Completed"] },
    Attending_Sabha: { type: String, enum: ["Yes", "No"] },
    Follow_Up_Name: { type: String, require: true },
    Sabha_Joining_Date: { type: Date, require: true },
    Occupation: { type: String },
    Marital_Status: { type: String, enum: ["Married", "Unmarried"] },
    Blood_Group: { type: String, enum: ["A", "B", "AB", "O"] },
    Performing_Puja: { type: String, enum: ["Yes", "No"] },
    Nishtawan: { type: String, enum: ["Yes", "No"] },
    Languages_Known: {
      type: String,
      enum: ["Gujarati", "Hindi", "English", "Other"],
    },
  },
  {
    timestamps: true,
  },
  { _id: false },
  { __v: false }
);

module.exports = mongoose.model("Bhulku", bhulkuschema);
