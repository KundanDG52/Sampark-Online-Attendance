const mongoose = require("mongoose");
const Sabha = require("../models/sabha");
const Bhulku = require("../models/bhulku");

//To fetch details of all sabha in database
const getsabhas = async (req, res, next) => {
  try {
    const sabhadetails = await Sabha.find({});
    res
      .status(200)
      .json({ message: "Please find your all sabha", sabhadetails });
  } catch (error) {
    next(error);
  }
};

//To create new sabha in database
const createsabha = async (req, res, next) => {
  try {
    const { sabha_name, sabha_type, sabha_location, sabha_leader } = req.body;
    const checksabha = await Sabha.findOne({ sabha_name });
    if (checksabha) {
      res.status(401);
      next("This sabha is already exist in database");
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
    next(error);
  }
};

const getsabha = async (req, res, next) => {
  try {
    // const sabhadetails = await Sabha.findById(req.body.id);
    const id = req.params.id;
    const sabhadetails = await Sabha.find({
      _id: new mongoose.Types.ObjectId(id),
    });
    res.status(200).json({ sabhadetails });
  } catch (error) {
    next(error);
  }
};

//To update sabha details by thier unique id
const updatesabha = async (req, res, next) => {
  try {
    // res.status(200).json({ message: "Please find your updated sabha" });
    const id = req.params.id;
    const sabhaId = await Sabha.find({ _id: id });
    if (sabhaId) {
      const detailsupdate = await Sabha.updateOne(
        { _id: sabhaId },
        { $set: req.body }
      );
      res.status(201).json({ message: "details are updated", detailsupdate });
    } else {
      res.status(404).json({ message: "bhulku is not available in database" });
    }
  } catch (error) {
    next(error);
  }
};

//To delete sabha and thier details by thier unique id
const deletesabha = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const sabhaId = await Sabha.find({ _id: id });
    // console.log(bhulkuid);
    if (sabhaId) {
      const detailsdelete = await Sabha.deleteOne({ _id: sabhaId });
      res.status(201).json({ message: "bhulku deleted succefully", sabhaId });
    } else {
      res.status(404).json({ message: "bhulku is not available in database" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getsabha,
  createsabha,
  updatesabha,
  deletesabha,
  getsabhas,
};
