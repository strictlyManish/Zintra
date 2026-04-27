const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const BlackListModel = require("../models/blacklist.model");
/**
 *
 * @param {*} req username, email, password
 * @description This controller is responsible for registering a new user. It checks if the user already exists, and if not, it creates a new user and generates a JWT token for authentication.
 * @response 201 - User registration successful
 */

const Registercontroller = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRATE);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registeration successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 *
 * @param {*} req username, password
 * @description This controller is responsible for logging in a user.
 * It checks if the user exists and if the password is correct, and if so, it generates a JWT token for authentication.
 * @response 200 - User login successful
 */

async function Logincontroller(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validUser = await userModel.findOne({ username });

    if (!validUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPass = await bcrypt.compare(password, validUser.password);

    if (!validPass) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRATE);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User Login sucessfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

/**
 * 
 * @param {*} res user logged out successfully
 * @returns user logged out successfully gives 
 * @description This controller is responsible for logging out a user. It checks if the token exists in the cookies, and if so, it adds the token to a blacklist and clears the cookie.
 */

async function Logoutcontroller(req, res) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token found. User already logged out.",
      });
    }

    await BlackListModel.create({
      token,
      createdAt: new Date(),
    });

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
}

module.exports = {
  Registercontroller,
  Logincontroller,
  Logoutcontroller,
};
