import { User } from "../models/userModel.js";

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;

        // Find all users except the logged-in user, exclude password
        const otherUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");

        return res.status(200).json({
            success: true,
            users: otherUsers,
        });
    } catch (error) {
        console.error("❌ Error in getOtherUsers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
