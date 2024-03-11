import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.listen(4400, () => {
  console.log('Listening at port 4400')
})

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/api/user', testRouter);
app.use('/api/user', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    status: statusCode,
    message,
    success: false
  })
})
