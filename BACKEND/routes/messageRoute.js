import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();
// Send Msg
router.post("/send/:id", isAuthenticated, upload.single("image"), sendMessage);
// Receive Msg
router.get("/:id", isAuthenticated, getMessage);

export default router;
