const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.PRIVATEKEY);
    const { user } = decoded;
    console.log(user);
    next(); //use of this is to call next middleware and stop current request and response cycle//
  } catch (error) {
    return res.status(401).json({ error, message: "AUTH Failed" });
  }
};
