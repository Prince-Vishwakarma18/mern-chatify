import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
    const { authUser, selectedUser } = useSelector((state) => state.user);
    const isSender =
        (message?.senderId?._id ?? message?.senderId) === authUser?._id;
    if (!message || !authUser) return null;
    const scroll = useRef();
    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div className="text-xs sm:text-sm md:text-base lg:text-lg px-1">
            <div
                ref={scroll}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
                {/* User Avatar */}
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="user avatar"
                            src={
                                isSender
                                    ? authUser.profilePic ||
                                      "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                    : selectedUser?.profilePic ||
                                      "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                            }
                        />
                    </div>
                </div>

                {/* Bubble */}
                <div
                    className={`chat-bubble ${
                        isSender
                            ? "p-1 bg-blue-950 text-white"
                            : "p-1 bg-gray-800 text-white"
                    } py-0`}
                >
                    {message?.image && (
                        <img
                            src={message.image}
                            alt="chat media"
                            className="w-full max-w-[100px] sm:max-w-[200px] md:max-w-[200px] lg:max-w-[200px] rounded-md object-cover"
                        />
                    )}
                    {message?.message && <p>{message.message}</p>}
                </div>

                {/* Time */}
                <div className="chat-footer">
                    <time className="text-xs opacity-50">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </time>
                </div>
            </div>
        </div>
    );
}

export default Message;
