import bcryptjs from "bcryptjs";
import User from "../models/model.js";

const signup = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ firstName, lastName, userName, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(200).json("User Successfully Created")
  } catch (error) {
    next(error);
  }
}

export default signup;