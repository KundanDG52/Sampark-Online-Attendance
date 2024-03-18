const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt"); //it is use for password hashing//
const jwt = require("jsonwebtoken"); // it is use for token generation//
const bhulku = require("../models/bhulku");
require("dotenv").config(); // extension to use dotenv//

//signup the new user
const createuser = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body; //destructring of object data//
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All field are mandatory");
    } else {
      const checkuser = await User.findOne({ username: username });
      if (checkuser) {
        res.status(400);
        throw new Error("User is already registed");
      } else {
        const hashpassword = await bcrypt.hash(password, 10);
        console.log("my hashed password is", hashpassword);

        const newuser = await User.create({
          username,
          email,
          password: hashpassword,
          user_type: req.body.user_type,
          //   _id: new mongoose.Types.ObjectId(),
        });
        console.log(newuser);
      }
    }
    res.status(200).json({ message: "user was created" });
  } catch (error) {
    throw error.message;
  }
};

//login the existing user with token generation
const loginuser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("Please provide username and password");
    } else {
      const checkbhulku = await User.findOne({ username: username });
      const isCorrectPassword = await bcrypt.compare(
        password,
        checkbhulku.password
      );
      if (checkbhulku && isCorrectPassword) {
        const accesstoken = jwt.sign(
          {
            user: {
              email: checkbhulku.email,
              username: checkbhulku.username,
              user_type: checkbhulku.user_type, //flag//
            },
          },
          process.env.PRIVATEKEY,
          { expiresIn: "12h" }
        );
        res.status(200).json({ accesstoken });
      } else {
        res
          .status(401)
          .json({ message: "Please provide correct username and password" });
      }
    }
  } catch (error) {
    next(error);
    // throw error.message;
  }
};

//To fetch all users in database
const getusers = async (req, res, next) => {
  try {
    res.status(200).json({ message: "please get your all register users" });
  } catch (error) {
    throw error.message;
  }
};

//To fetch single user by thier unique id
const getuser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userdetails = await User.findOne({ _id: id });
    res.status(200).json({ userdetails });
  } catch (error) {
    throw error.message;
  }
};

//To delete single user by thier unique id
const deleteuser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletebhulku = await User.deleteOne({ _id: id });
    if (deletebhulku) {
      res.status(200).json({ message: " user was deleted succesfully" });
    }
  } catch (error) {
    throw error.message;
  }
};

const newuser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    let passwordis = req.body.password;
    const useris = await bhulku.findOne(
      { _id: id },
      { email: 1, username: 1, user_type: 1 }
    );
    const password = await bcrypt.hash(passwordis, 10);
    // console.log(typeof password);

    const updatepassword = await bhulku.updateOne(
      { _id: id },
      { $set: { password: password, username: req.body.username } }
    );
    console.log(updatepassword);
    res
      .status(201)
      .json({ message: "password updated successfully", password });
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  createuser,
  loginuser,
  getusers,
  getuser,
  deleteuser,
  newuser,
};
