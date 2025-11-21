import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import{app, server} from "./socket/socket.js"
import path from "path";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve()

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//Frontend
app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true,
    })
);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
// Default route
app.get("/", (req, res) => {
    res.send("Chatify is running");
});
// -----------------DEPLOYMENT-----------------
// if (process.env.NODE-ENV=="production") {
//     app.use(express.static(path.join(__dirname,"../FRONTEND/dist")));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../FRONTEND","dist","index.html"));
//     })
// }



// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
