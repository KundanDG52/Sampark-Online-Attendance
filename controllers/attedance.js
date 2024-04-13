const mongoose = require("mongoose");
const Attendance = require("../models/attendance");
const Sabha = require("../models/sabha");
const Bhulku = require("../models/bhulku");

const getAllAttendance = async (req, res, next) => {
  try {
    const allbhulkuattendance = await Attendance.find({});

    
    // res
    //   .status(200)
    //   .json({ message: "Please find your all attedance", allbhulkuattendance });
  } catch (error) {
    next(error);
  }
};

const createAttendance = async (req, res, next) => {
  try {
    const { sabha, sabhadate } = req.body;
    const checkattendance = await Attendance.findOne({
      : ,
      date: date,
    });
    if (checkattendance) {
      res
        .status(400)
        .json({ message: "Attedance for this  is already created" });
    } else {


      try {
       
        const TotalBhulku = await Bhulku.aggregate([{
          $lookup: {
            From: 'Sabha',
            LocalField: ‘sabha_id’,
            foreignField: ‘_id’,
            as:sabha_id, 
          }},{
           $project:{
             
           }
        }])
      }
        catch (error) {
           next(error);
  }
        
      

      
      const bhulkuattendance = await Attendance.create({
        ,
        date,
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
    next(error);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { id, date } = req.query;
    const date = new Date(date); // here we covert string date to Date formate saved in DB.//
    const attedance = await Attendance
      .find
      // {
      //   : id,
      //   date: date,
      // },
      // { date: 1, _id: 0, attendees: 1, nonattendees: 1, : 1 }
      ()
      .populate(["attendees", "nonattendees"]); // with use this populate we can fetch all details of id//
    // const { attendees, nonattendees } = attedance;
    res
      .status(200)
      .json
      //   {
      //   message: "Please find your attedance of attendees",
      //   attendees,
      //   nonattendees,
      // }
      ();
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const updateAttendancebydateand = async (req, res, next) => {
  try {
    const { , date } = req.body;
    if ( || date) {
      const dateis = new Date(date);
      const updateattendance = await Attendance.updateOne(
        { : , date: sabhadateis },
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
    next(error);
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
    next(error);
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
