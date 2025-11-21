import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function OthersUser({ user }) {
    const dispatch = useDispatch();
    const { onlineUsers, selectedUser } = useSelector((store) => store.user);

    const isOnline = onlineUsers.includes(user._id);
    const isSelected = selectedUser?._id === user._id; 

    const handleSelectedUser = (user) => {
        dispatch(setSelectedUser(user));
    };

    return (
        <div className="flex flex-col gap-1">
            <div
                onClick={() => handleSelectedUser(user)}
                className={`mt-2 flex items-center gap-4 p-1 rounded-xl transition-all duration-300 cursor-pointer
                    ${isSelected
                    ? "bg-blue-500"
                        : "hover:bg-black/30 hover:backdrop-blur-md"} // Normal hover
                `}
            >
                <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img
                            src={
                                user.gender === "male"
                                    ? "https://avatar.iran.liara.run/public/boy?username=" + user.username
                                    : "https://avatar.iran.liara.run/public/girl?username=" + user.username
                            }
                            alt={user.fullName}
                        />
                    </div>
                </div>

                <div>
                    <h1 className={`text-l font-semibold ${isSelected ? "text-white" : "text-black"}`}>
                        {user.username}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default OthersUser;
