import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import testRouter from "./routes/user.route.js";
import signupRouter from "./routes/auth.route.js";

// initializing the app variable to be express
const app = express()

// 
app.use(express.json());

// creating a port route of 4444
app.listen(4433, () => {
  console.log("App is running on Port 4433")
})

// configuring the environment folder
dotenv.config();

// connecting mongoose to the variable name created for the database link in the environment folder
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongo DB")
  })
  .catch((error) => {
    console.log(error)
  })

// the test api route
app.use("/api/user", testRouter)

// the signup api route
app.use("/api/auth", signupRouter)

// creating a middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Unable to Sign Up. Please try again"
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})