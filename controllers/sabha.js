const mongoose = require("mongoose");
const Sabha = require("../models/sabha");
const Bhulku = require("../models/bhulku");

const getsabhas = async (req, res, next) => {
  try {
    const sabhadetails = await Sabha.find({});
    res
      .status(200)
      .json({ message: "Please find your all sabha", sabhadetails });
  } catch (error) {
    throw error.message;
  }
};

const createsabha = async (req, res, next) => {
  try {
    const { sabha_name, sabha_type, sabha_location, sabha_leader } = req.body;
    const checksabha = await Sabha.findOne({ sabha_name });
    if (checksabha) {
      res.status(401);
      throw new Error("This sabha is already exist in database");
    } else {
      const newsabha = await Sabha.create({
        sabha_name,
        sabha_type,
        sabha_location,
        sabha_leader,
      });
      console.log("new sabha is ", newsabha);
      res
        .status(200)
        .json({ message: "Your sabha was created succesfully", newsabha });
    }
  } catch (error) {
    throw res.status(400).json({ error });
  }
};

const getsabha = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Please find your sabha" });
  } catch (error) {
    throw error.message;
  }
};

const updatesabha = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Please find your updated sabha" });
  } catch (error) {
    throw error.message;
  }
};

const deletesabha = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Your sabha was deleted succesfully" });
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  getsabha,
  createsabha,
  updatesabha,
  deletesabha,
  getsabhas,
};
