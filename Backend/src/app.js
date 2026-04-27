const express = require("express");
const app = express();
const authroute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");

// Middlewares
app.use(express.json())
app.use(cookieParser());




// Application Routes

app.use("/zyntra/auth",authroute);
app.use("/zyntra",userRoutes)


module.exports = app;