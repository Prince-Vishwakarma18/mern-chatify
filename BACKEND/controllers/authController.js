import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER 
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } =
            req.body;
        // console.log("Received user data:", req.body);

        if (
            !fullName ||
            !username ||
            !password ||
            !confirmPassword ||
            !gender
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ success: false, message: "Passwords do not match" });
        }

        // Checking if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists. Try a different one",
            });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        let profilePhoto =
            gender === "male"
                ? `https://avatar.iran.liara.run/public/boy?username=${username}`
                : `https://avatar.iran.liara.run/public/girl?username=${username}`;


        if (req.file && req.file.path) {
            profilePhoto = req.file.path || req.file.filename || req.file.url;
        }


        // Creating new user
        const newUser = await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto,
            gender,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                profilePhoto: newUser.profilePhoto,
            },
        });
    } catch (error) {
        console.error(" Error in register:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

//LOGIN 
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                success: true,
                message: "Login successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    fullName: user.fullName,
                    profilePhoto: user.profilePhoto,
                },
            });
    } catch (error) {
        console.error(" Error in login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// LOGOUT
export const logout = (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error(" Error in logout:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
