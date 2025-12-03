import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../../hooks/useGetOtherUser.js";
import { useSelector } from "react-redux";

function Sidebar() {
    useGetOtherUsers();

    const otherUsers = useSelector((state) => state.user.otherUsers);
    const onlineUsers = useSelector((state) => state.user.onlineUsers);
    const searchQuery = useSelector((state) => state.user.searchQuery);

    // Search user
    const filteredUsers = (otherUsers || []).filter((user) => //[] it prevent from crash if otheruser are undefined
        user.fullName.toLowerCase().includes((searchQuery || "").trim().toLowerCase())
    );

    // Online User
    const online = filteredUsers.filter((user) =>
        onlineUsers?.includes(user._id)
    );
    // Offline user
    const offline = filteredUsers.filter((user) =>
        !onlineUsers?.includes(user._id)
    );

    //Spread both online user and off;ine user in sorted user
    const sortedUsers = [...online, ...offline];

    if (!otherUsers || otherUsers.length === 0) {
        return (
            <div className="flex flex-col border-r border-white w-20 lg:min-w-[250px] py-2 h-full items-center">
                <span className="loading loading-spinner"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:min-w-[250px] h-full border-r border-white/35 text-xs sm:text-sm md:text-base lg:text-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
            <div className="flex-1 overflow-y-auto scrollbar-none">
                {sortedUsers.length > 0 ? (
                    sortedUsers.map((user) => (
                        <OtherUser key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-5">
                        No users found
                    </p>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
