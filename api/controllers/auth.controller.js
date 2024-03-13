import bcryptjs from "bcryptjs";
import User from "../models/model.js";

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
    return res.status(200).json({ message: "Signed in successfully" })
  } catch (error) {
    next(error)
  }
}