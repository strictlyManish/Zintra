const express = require("express");
const authroute = express.Router();

const  {
    Registercontroller,
    Logincontroller,
    Logoutcontroller
} = require("../controllers/auth.controller");



authroute.post("/register",Registercontroller)
authroute.post("/login",Logincontroller)
authroute.get("/logout",Logoutcontroller)


module.exports = authroute;