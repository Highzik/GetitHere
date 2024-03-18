import bcryptjs from "bcryptjs";
import User from "../models/model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return res.status(404).json({ message: "User not found" });
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return res.status(404).json({ message: "Wrong credentials" })
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc;
    res.
      cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}