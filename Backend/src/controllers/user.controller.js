const userModel = require("../models/user.model");
const imageKit = require("../services/imageKit");

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

const UpdateUserController = async (req, res) => {
  try {
    const { bio } = req.body;

    let uploadedImage = null;

    if (req.file) {
      uploadedImage = await imageKit.upload({
        file: req.file.buffer,
        fileName: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`,
        folder: "users",
      });
    }

    const updatedData = {
      bio,
    };

    if (uploadedImage) {
      updatedData.profilePicture = uploadedImage.url;
    }

    await userModel.updateOne(
      { _id: req.user.id },
      { $set: updatedData }
    );

    return res.status(200).json({
      message: "User updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

const DeleteUserController = async (req,res) =>{};

module.exports = {
  FetchUserController,
  UpdateUserController,
  DeleteUserController
};
