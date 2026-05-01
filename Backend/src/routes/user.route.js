const express = require("express");
const { FetchUserController, UpdateUserController, DeleteUserController } = require("../controllers/user.controller");
const AuthUserConttroller = require("../middlewares/auth.middleware");
const userRoutes = express.Router();
const upload = require("../middlewares/upload.middleware");


userRoutes.get("/",AuthUserConttroller,FetchUserController)
userRoutes.patch("/update",AuthUserConttroller,upload.single("profilePicture"),UpdateUserController)
userRoutes.post("/delete",AuthUserConttroller,DeleteUserController)


module.exports = userRoutes;