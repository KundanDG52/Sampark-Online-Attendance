const Bhulku = require("../models/bhulku");
const mongoose = require("mongoose");

//To get birthday by passing day

const bydate = async (req, res, next) => {
  const date = new Date(req.query.date || Date.now());
  const day = date.getDate();
  const month = date.getMonth() + 1;

  console.log(day, month);

  const fetchbhulku = await Bhulku.aggregate([
    {
      $project: {
        month: { $month: "$Date_Of_Birth" },
        day: { $dayOfMonth: "$Date_Of_Birth" },
        name: "$First_Name",
        address: "$Address",
        mobile: "$Mobile",
      },
    },
    {
      $match: { month: month, day: day },
    },
  ]);

  res
    .status(200)
    .json({ message: "please get your birthday list", fetchbhulku });
};

//To get birthday by passing month

const bymonth = async (req, res, next) => {
  const date = new Date(req.query.date);
  const monthToday = date.getMonth() + 1;

  const fetchbhulku = await Bhulku.aggregate([
    {
      $project: {
        month: { $month: "$Date_Of_Birth" },
        name: "$First_Name",
        address: "$Address",
        mobile: "$Mobile",
      },
    },
   { $match: { month: monthToday }, }
  ]);
  res
    .status(200)
    .json({ message: "please get your birthday list", fetchbhulku });
};

//To get birthday by passing range
const byrange = async (req, res, next) => {
  const fromdate = new Date(req.query.dateOfbirth.gte);
  const todate = new Date(req.query.dateOfbirth.lte);
  const fromday = fromdate.getDate();
  const frommonth = fromdate.getMonth() + 1;
  const today = todate.getDate();
  const tomonth = todate.getMonth() + 1;

  const fetchbhulku = await Bhulku.aggregate([
    {
      $project: {
        month: { $month: "$Date_Of_Birth" },
        day: { $dayOfMonth: "$Date_Of_Birth" },
        name: "$First_Name",
        address: "$Address",
        mobile: "$Mobile",
        dateOfbirth: "$Date_Of_Birth",
      }, },

{      $match: {
        month: { $gte: frommonth, $lte: tomonth },
        day: { $gte: fromday, $lte: today },
      },
   }
  ]);

  res.status(200).json({
    message: "please get your birthday list for provided range",
    fetchbhulku,
  });
};

module.exports = { bydate, bymonth, byrange };
