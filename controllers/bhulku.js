const mongoose = require("mongoose");
const Bhulku = require("../models/bhulku");

//To fetch details of all bhulkus
const getbhulkus = async (req, res, next) => {
  try {
    const bhulkudetails = await Bhulku.find({});
    res.status(200).json({ bhulkudetails });
  } catch (error) {
    // throw error;
    next(error);
  }
};

//To fetch details of bhulku
const getbhulku = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bhulkudetails = await Bhulku.find({
      _id: new mongoose.Types.ObjectId(id),
    });
    res.status(200).json({ bhulkudetails });
  } catch (error) {
    next(error);
    // throw error;
  }
};

//To add new bhulku in database
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
      const presentbhulku = await Bhulku.find({}, { Member_id: 1 });
      const memberidis = presentbhulku.length + 1;
      const bhulku = await Bhulku.create({
        Member_id: memberidis,
        First_Name,
        Address,
        Mobile,
        Gender,
        Date_Of_Birth: req.body.Date_Of_Birth,
        username: req.body.username || "dasnadas",
        email: req.body.email || "dasnadas@gmail.com",
        password: req.body.password || "dasnadas123@",
        user_type: req.body.user_type || "yuvak",
        createdAt: Date.now(),
      });
      console.log(bhulku);
      res
        .status(201)
        .json({ message: "Bhulku was created succefully", bhulku });
    }
  } catch (error) {
    next(error);
  }
};

//To update details bhulku by thier unique id
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
  } catch (error) {
    next(error);
  }
};

//To delete bhulku by their unique id
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
    next(error);
  }
};

module.exports = {
  getbhulkus,
  createbhulku,
  updatebhulku,
  deletebhulku,
  getbhulku,
};
