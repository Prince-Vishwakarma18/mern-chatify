import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsPaperclip } from "react-icons/bs";
import axiosInstance from "../../services/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../store/messageSlice.js";

function SendMsg() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);

    const { selectedUser } = useSelector((state) => state.user);
    const { messages = [] } = useSelector((state) => state.messages);

    const handleImgSend = (e) => {
        const img = e.target.files[0];
        setImage(img);
    };

    const handleSendMsg = async (e) => {
        e.preventDefault();

        if (!message.trim() && !image) return;

        const formData = new FormData();
        if (message) formData.append("message", message);
        if (image) formData.append("image", image);

        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            dispatch(setMessages([...messages, res.data.newMessage]));
            // Clear inp
            setMessage("");
            setImage(null);

            console.log("BACKEND RESPONSE:", res.data);
        } catch (error) {
            console.log("Error in send msg", error);
        }
    };

    return (
        <div className="w-full py-2 px-1 rounded-full">
            {/* IMAGE PREVIEW */}
            {image && (
                <div className="mb-2 relative inline-block">
                    {/* IMAGE PREVIEW */}
                    <img
                        src={URL.createObjectURL(image)} // Creates a temporary URL for the selected file so the browser can preview it.
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-md"
                    />

                    {/* REMOVE BUTTON */}
                    <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
                    >
                        ✕
                    </button>
                </div>
            )}

            <form onSubmit={handleSendMsg} className="flex items-center gap-2">
                {/* MEDIA UPLOAD BTN */}
                <label
                    htmlFor="mediaInput"
                    className="cursor-pointer text-3xl hover:text-black"
                >
                    <BsPaperclip />
                </label>

                <input
                    onChange={handleImgSend}
                    type="file"
                    id="mediaInput"
                    name="image"
                    accept="image/*"
                    className="hidden"
                />

                {/* MSG INPUT */}
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="w-full rounded-full border-none bg-gray-800 text-white outline-none placeholder-gray-500 p-2 sm:p-3"
                />

                {/* SEND BTN */}
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

export default SendMsg;
