import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Please fill in all fields",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User does not exist",
    });
  }
  const passwordMatch = bcryptjs.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({
      error: true,
      message: "Password is incorrect",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const { password: userPassword, ...userWithoutPassword } = user._doc;
  const expiryDate = new Date(Number(new Date()) + 3600 * 1000); // 1 hour
  res.cookie("access_token", token, { httpOnly: true, expiresIn: expiryDate }).status(200).json({
    error: false,
    message: "Login successful",
    userWithoutPassword,
  });
};
