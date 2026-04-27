const express = require("express");
const { FetchUserController } = require("../controllers/user.controller");
const AuthUserConttroller = require("../middlewares/auth.middleware");
const userRoutes = express.Router();



userRoutes.get("/me",AuthUserConttroller,FetchUserController)



module.exports = userRoutes;