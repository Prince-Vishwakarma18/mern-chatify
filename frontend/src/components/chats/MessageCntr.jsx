import React from "react";
import SendMsg from "./SendMsg";
import MessageBox from "./MessageBox";
import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";

function MessageCntr() {
    const { selectedUser, authUser, onlineUsers } = useSelector((state) => state.user);
    useGetMessages();
    const isOnline = onlineUsers?.includes(selectedUser?._id); // if selected userId  include online userss then user is online

    if (!selectedUser) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh w-full bg-transparent text-gray-200 ">
                <h2 className="font-semibold ">Hey, {authUser?.fullName}</h2>
                <h2 className="text-xl font-semibold">
                    let's start conversation
                </h2>
            </div>
        );
    }
    return (
        <div className="w-full h-full flex flex-col">
            {/*header */}
            <div className="w-full flex items-center px-2 py-2  rounded-md bg-clip-padding bg-black/35 ">
                <div className="avatar">
                    <div className="w-10 sm:w-12 md:w-12 rounded-full">
                        <img src={selectedUser.profilePic} />
                    </div>
                </div>

                <div className="ml-2">
                    <h1 className="font-semibold uppercase text-white text-xs sm:text-sm md:text-base lg:text-lg">
                        {selectedUser.username}
                    </h1>
                    <p className="text-xs text-white sm:text-sm">
                        {isOnline ? " online" : " offline"}
                    </p>
                </div>
            </div>

            {/* Message List*/}
            <div className="flex-1 overflow-y-scroll scrollbar-none">
                <MessageBox />
            </div>

            {/* Send Message */}
            <SendMsg />
        </div>
    );
}

export default MessageCntr;
