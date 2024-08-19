import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Please fill in all fields",
    });
  }
  //   check if user already exists
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({
      error: true,
      message: "Email already exists",
    });
  }

  // username already exists
  const usernameExists = await User.findOne({ username});
if(usernameExists){
  return res.status(400).json({
    error: true,
    message: "Username is already taken",
  });
}
  
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      error: false,
      message: "User created successfully!",
    });
  } catch (error) {
    next(error);
  }
};
