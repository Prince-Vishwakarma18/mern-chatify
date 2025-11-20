import React from 'react';
import Messages from './Messages';
import SendMessage from './SendMessage';
import { useSelector } from 'react-redux';

function MessageContainer() {
    const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);

    // If no user selected
    if (!selectedUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 text-gray-600">
                <h2 className="font-semibold text-black">Hey, {authUser?.fullName}</h2>
                <h2 className="text-xl font-semibold">Let’s start a conversation</h2>
            </div>
        );
    }

    const isOnline = onlineUsers?.includes(selectedUser._id);

    return (
        <div className="flex flex-col h-screen w-full shadow-lg">

            {/* Header */}
            <div className="flex items-center gap-4 sm:pb-1 md:p-2 lg:pb-2 bg-white shadow-md border-b border-black">

                <div className={`avatar ${isOnline ? "avatar-online" : "a"}`}>
                    <div className="w-11 rounded-full">
                        <img
                            src={
                                selectedUser.profilePhoto ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
                            }
                            alt="user"
                        />
                    </div>
                </div>

                <div>
                    <h1 className="font-semibold text-gray-800 text-sm md:text-base">
                        {selectedUser.username}
                    </h1>

                    {/* Online / Offline Status */}
                    <p className="text-xs text-gray-500">
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            <Messages />
            <SendMessage />
        </div>
    );
}

export default MessageContainer;
