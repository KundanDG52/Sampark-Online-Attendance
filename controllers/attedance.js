const mongoose = require("mongoose");
const Attendance = require("../models/attendance");

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
    const { id, checksabhadate } = req.query;
    const date = new Date(checksabhadate).toISOString();

    const sabhaattedance = await Attendance.find(
      {
        sabha: id,
        sabhadate: { $lte: new Date(date) },
      },
      { sabhadate: 1, _id: 0 }
    );
    console.log("sabhaattedance", sabhaattedance);
    const [sabhakadate] = sabhaattedance;
    const { sabhadate } = sabhakadate;
    const [attendance] = sabhaattedance;
    const { attendees, nonattendees } = attendance;
    res.status(200).json({
      message: "Please find your attedance of attendees",
      attendees,
      nonattendees,
    });
  } catch (error) {
    throw error.message;
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateattendance = await res
      .status(200)
      .json({ message: "Please find your updated attedance" });
  } catch (error) {
    throw error.message;
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: "Your attendance was deleted succesfully" });
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  // getAllAttendance,
  createAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
};
