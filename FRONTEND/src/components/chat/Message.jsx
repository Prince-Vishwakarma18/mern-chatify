import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Message({ message }) {
    const { authUser, selectedUser } = useSelector(store => store.user)
    const isSender = message?.senderId === authUser?._id;
    const scroll = useRef();
    if (!message || !authUser) return null;
    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }, [message])
    return (
        <div ref={scroll} className='text-xs sm:text-sm md:text-base lg:text-lg'>
            <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10  sm:w-10 md:w-12 lg:w-14 rounded-full">
                        <img
                            alt="user avatar"
                            src={isSender
                                ? authUser.profilePhoto || "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                : selectedUser?.profilePhoto || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
                        />
                    </div>
                </div>
                {/* Msg  */}
                <div className={`chat-bubble ${isSender ? 'p-1 bg-blue-600 text-white' : 'p-1 bg-gray-800 text-white'}`}>
                    {message?.message && <p>{message.message}</p>}
                    {message?.imageUrl && (
                        <img
                            src={message.imageUrl}
                            alt="chat media"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-md"
                        />
                    )}
                </div>

                <div className="chat-footer">
                    <time className="text-xs opacity-50 text-black">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                </div>
            </div>
        </div>
    );
}

export default Message;
