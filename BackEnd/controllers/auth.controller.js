import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        const user = await newUser.save();
        res.status(201).json({
            error: false,
            message: "User created successfully!",
        });        
    } catch (error) {
        next(error);       
    }

};
