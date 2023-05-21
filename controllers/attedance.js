const mongoose = require("mongoose");
const Attendance = require("../models/attendance");
const sabha = require("../models/sabha");

// const getAllAttendance = async (req, res, next) => {
//   try {
//     const allbhulkuattendance = await Attendance.find({});
//     res
//       .status(200)
//       .json({ message: "Please find your all attedance", allbhulkuattendance });
//   } catch (error) {
//     throw error.message;
//   }
// };

const createAttendance = async (req, res, next) => {
  try {
    const { sabha, sabhadate } = req.body;
    const checksabhaattendance = await Attendance.findOne({
      sabha: sabha,
      sabhadate: sabhadate,
    });
    if (checksabhaattendance) {
      res
        .status(400)
        .json({ message: "Attedance for this sabha is already created" });
    } else {
      const bhulkuattendance = await Attendance.create({
        sabha,
        sabhadate,
        attendees: req.body.attendees,
        nonattendees: req.body.nonattendees,
      });
      console.log(bhulkuattendance);
      res.status(200).json({
        message: "Your attendance was created succesfully",
        bhulkuattendance,
      });
    }
  } catch (error) {
    throw error.message;
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { id, sabhadate } = req.query;
    const date = new Date(sabhadate); // here we covert string date to Date formate saved in DB.//
    const sabhaattedance = await Attendance.findOne(
      {
        sabha: id,
        sabhadate: date,
      },
      { sabhadate: 1, _id: 0, attendees: 1, nonattendees: 1, sabha: 1 }
    ).populate(["attendees", "nonattendees"]); // with use this populate we can fetch all details of id//
    const { attendees, nonattendees } = sabhaattedance;
    res.status(200).json({
      message: "Please find your attedance of attendees",
      attendees,
      nonattendees,
    });
  } catch (error) {
    throw error.message;
  }
};

const updateAttendancebyid = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      //for checking id provided by the user is valid or not//
      const updateattendance = await Attendance.updateOne(
        { _id: id },
        { $set: req.body }
      );
      console.log(updateattendance);
      res.status(200).json({
        message: "Please find your updated attedance",
        updateattendance,
      });
    } else {
      res.status(400).json({ message: "please provide correct ID" });
    }
  } catch (error) {
    throw error.message;
  }
};

const updateAttendancebydateandsabha = async (req, res, next) => {
  try {
    const { sabha, sabhadate } = req.body;
    if (sabha || sabhadate) {
      const sabhadateis = new Date(sabhadate);
      const updateattendance = await Attendance.updateOne(
        { sabha: sabha, sabhadate: sabhadateis },
        { $set: req.body }
      );
      console.log(updateattendance);
      res.status(200).json({
        message: "Please find your updated attedance",
        updateattendance,
      });
    } else {
      res
        .status(400)
        .json({ message: "please provide correct sabha and sabhadate" });
    }
  } catch (error) {
    throw error.message;
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      //for checking id provided by the user is valid or not//
      const deleteattendance = await Attendance.deleteOne({ _id: id });
      console.log(deleteattendance);
      res.status(200).json({
        message: "Attendance was deleted succesfully",
      });
    } else {
      res.status(400).json({ message: "please provide correct ID" });
    }
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  // getAllAttendance,
  createAttendance,
  getAttendance,
  updateAttendancebyid,
  updateAttendancebydateandsabha,
  deleteAttendance,
};
