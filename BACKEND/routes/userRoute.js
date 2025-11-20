import { upload } from "../config/multer.js";
import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { getOtherUsers } from "../controllers/otherUsersController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("profilePhoto"), register);

router.post("/login", login);
router.post("/logout", logout);

// Get all users except the logged-in user
router.get("/all", isAuthenticated, getOtherUsers);

export default router;
