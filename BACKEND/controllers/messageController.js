import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId ,io} from "../socket/socket.js";

// SEND MSG
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id; 
        // console.log("Sender:", senderId);
        // console.log("Receiver:", receiverId);
        // console.log("req.cookies.token:", req.cookies?.token);
        // console.log("req.cookies:", req.cookies);


        const { message } = req.body;
        const image = req.file ? req.file.path : null;

        
                if (!receiverId) {
                    return res.status(400).json({
                        success: false,
                        message: "Receiver ID is missing",
                    });
                }
        if (!message && !req.file) {
            return res.status(400).json({
                success: false,
                message: "Empty message!",
            });
        }

        // Find existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Create conversation if not found
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        // Create and save new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message: message || "",
            imageUrl: image || null,
        });

        // Add message to conversation
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage)
            
        }
        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            newMessage: newMessage,
        });
    } catch (error) {
        console.error(" Error in sendMessage:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// GET MSG
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        if (!receiverId) {
            return res.status(400).json({
                success: false,
                message: "Receiver ID is missing",
            });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");

        return res.status(200).json({
            success: true,
            messages: conversation?.messages || [],
        });
    } catch (error) {
        console.error(" Error in getMessage:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
