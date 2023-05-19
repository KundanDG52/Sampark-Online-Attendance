const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bhulku = require("../models/bhulku");
require("dotenv").config();

const createuser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
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

        const newuser = User.create({
          username,
          email,
          password: hashpassword,
          //   _id: new mongoose.Types.ObjectId(),
        });
      }
    }
    res.status(200).json({ message: "user was created" });
  } catch (error) {
    throw error.message;
  }
};

const loginuser = async (req, res, next) => {
  try {
    const { username, password } = await req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("Please provide username and password");
    } else {
      const checkbhulku = await User.findOne({ username: username });
      if (
        checkbhulku &&
        (await bcrypt.compare(password, checkbhulku.password)) //first password is plain text password//
      ) {
        const accesstoken = jwt.sign(
          {
            user: {
              email: checkbhulku.email,
            },
          },
          process.env.PRIVATEKEY,
          { expiresIn: "12h" }
        );
        res.status(200).json({ accesstoken });
      } else {
        res.status(401);
        throw new Error("Please provide correct username and password");
      }
    }
  } catch (error) {
    throw error.message;
  }
};

const getusers = async (req, res, next) => {
  try {
    res.status(200).json({ message: "please get your all register users" });
  } catch (error) {
    throw error.message;
  }
};

const getuser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Please get your user" });
  } catch (error) {
    throw error.message;
  }
};

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

module.exports = { createuser, loginuser, getusers, getuser, deleteuser };
