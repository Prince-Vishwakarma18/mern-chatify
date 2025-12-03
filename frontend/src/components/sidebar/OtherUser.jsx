import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/userSlice";

function OtherUser({ user }) {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.user);
    const { onlineUsers } = useSelector((state) => state.user);
    const isOnline = onlineUsers?.includes(user?._id);
    const isSelected = selectedUser?._id === user?._id;
    const handleSelectedUser = (user) => {
        console.log(user);
        dispatch(setSelectedUser(user));
    };
    return (
        <div className="flex flex-col px-1 gap-1">
            <div
                onClick={() => handleSelectedUser(user)}
                className={`mt-1  flex items-center p-2  rounded-xl transition-all duration-300 ease-out cursor-pointer 
                ${
                    isSelected
                        ? "bg-gray-600 scale-[1.02]"
                        : "hover:bg-black/30 hover:backdrop-blur-md"
                }
                `}
            >
                {/* Avatar */}
                <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
                    <div className="w-10 rounded-full">
                        <img
                            src={
                                user.profilePic ||
                                "https://avatar.iran.liara.run/public/boy?username=username"
                            }
                            alt="User Avatar"
                        />
                    </div>
                </div>
                {/* Username */}
                <div>
                    <h1 className="text-lg ml-2 lg:block hidden font-semibold text-[rgb(228,250,250)]">
                        {user.username}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default OtherUser;
