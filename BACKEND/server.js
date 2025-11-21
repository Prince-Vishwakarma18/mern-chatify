import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";

// __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// ----------------- DEPLOYMENT -----------------
const frontendPath = path.join(__dirname, "../FRONTEND/dist");

app.use(express.static(frontendPath));

// ⚠️ Express v5 wildcard FIX — no "*" allowed
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
