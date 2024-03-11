import bcryptjs from "bcryptjs"
import User from "../models/model.js"

export const authenticate = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ firstName, lastName, userName, email, password: hashedPassword })
  try {
    await newUser.save()
    res.json({
      status: 200,
      message: "User Successfully Created"
    })
  } catch (error) {
    next(error)
  }
}