import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import testRouter from "./routes/user.route.js";
import signupRouter from "./routes/auth.route.js";

const app = express()
app.use(express.json());
app.listen(4444, () => {
  console.log("App is running on Port 4444")
})
dotenv.config();
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongo DB")
  })
  .catch((error) => {
    console.log(error)
  })

app.use("/api/user", testRouter)
app.use("/api/auth", signupRouter)