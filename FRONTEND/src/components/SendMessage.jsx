import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice.js";
import { BsPaperclip } from "react-icons/bs";

function SendMessage() {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null); 

    const dispatch = useDispatch();

    const { selectedUser, authUser } = useSelector((store) => store.user);
    const { messages = [] } = useSelector((store) => store.message);

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        console.log("Selected Image:", file);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() && !image) return;

        try {
            const formData = new FormData();
            if (message) formData.append("message", message);
            if (image) formData.append("image", image); 

            const res = await axios.post(
                `http://localhost:8080/api/messages/send/${selectedUser._id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Message Response:", res.data);
            dispatch(setMessages([...messages, res.data.newMessage]));
            // Reset input
            setMessage("");
            setImage(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="w-full bg-white p-2 border-t border-gray-300">
            <form onSubmit={handleSend} className="flex items-center gap-2">

                {/* MEDIA UPLOAD BUTTON */}
                <label
                    htmlFor="mediaInput"
                    className="cursor-pointer text-3xl text-gray-700 hover:text-black"
                >
                    <BsPaperclip />
                </label>

                <input
                    type="file"
                    id="mediaInput"
                    name="image" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleMediaUpload}
                />

                {/* TEXT INPUT */}
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="w-full text-black rounded-full border border-gray-400 outline-none placeholder-gray-500 p-2 sm:p-3 focus:ring-2 focus:ring-blue-400"
                />

                {/* SEND BUTTON */}
                <button
                    type="submit"
                    className="text-blue-600 text-3xl hover:text-blue-800 transition-all"
                >
                    <IoSend />
                </button>

            </form>
        </div>
    );
}

export default SendMessage;
