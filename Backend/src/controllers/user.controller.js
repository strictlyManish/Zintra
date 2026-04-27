const userModel = require("../models/user.model");

const FetchUserController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({
        message: "No user found",
        user: null,
      });
    }

    const userData = await userModel
      .findById(req.user.id)
      .select("-password -__v")
      .lean();


    if (!userData) {
      return res.status(404).json({
        message: "User not found in database",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

module.exports = {
  FetchUserController,
};
