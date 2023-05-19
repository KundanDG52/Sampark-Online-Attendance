const mongoose = require("mongoose");
const Bhulku = require("../models/bhulku");

const getbhulkus = async (req, res, next) => {
  try {
    const bhulkudetails = await Bhulku.find({});
    res.status(200).json({ bhulkudetails });
  } catch (error) {
    throw error;
  }
};

const getbhulku = async (req, res, next) => {
    try {
        const id = req.params.id;
      const bhulkudetails = await Bhulku.find({_id:id});
      res.status(200).json({ bhulkudetails });
    } catch (error) {
      throw error;
    }
  };

const createbhulku = async (req, res, next) => {
  try {
    const { First_Name, Address, Mobile, Gender } = req.body;
    if (!First_Name || !Address || !Mobile) {
      console.log(
        "please provide required details First_Name Address Mobile for create entry"
      );
      res.status(400);
      throw new Error("All Fields are mandatory !");
    } else {
      const bhulku = await Bhulku.create({
        Member_id: 1,
        First_Name,
        Address,
        Mobile,
        Gender,
      });
      console.log(bhulku);
      res
        .status(201)
        .json({ message: "Bhulku was created succefully", bhulku });
    }
  } catch (error) {
    throw error;
  }
};

const updatebhulku = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bhulkuid = await Bhulku.find({ _id: id });
    if (bhulkuid) {
      const detailsupdate = await Bhulku.updateOne(
        { _id: bhulkuid },
        { $set: req.body }
      );
      res.status(201).json({ message: "details are updated", detailsupdate });
    } else {
      res.status(404).json({ message: "bhulku is not available in database" });
    }
  } catch (error) {}
};

const deletebhulku = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const bhulkuid = await Bhulku.find({ _id: id });
    console.log(bhulkuid);
    if (bhulkuid) {
      const detailsdelete = await Bhulku.deleteOne({ _id: bhulkuid });
      res.status(201).json({ message: "bhulku deleted succefully", bhulkuid });
    } else {
      res.status(404).json({ message: "bhulku is not available in database" });
    }
  } catch (error) {
    throw error.message;
  }
};
module.exports = {
  getbhulkus,
  createbhulku,
  updatebhulku,
  deletebhulku,
  getbhulku
};
