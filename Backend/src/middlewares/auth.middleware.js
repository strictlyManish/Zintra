const BlackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

const AuthUserConttroller = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token not provided.",
      });
    }

    const isBlacklisted = await BlackListModel.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRATE);

    req.user = decodeData;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = AuthUserConttroller;
