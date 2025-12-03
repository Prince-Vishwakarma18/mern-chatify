import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/api.js";
import toast from "react-hot-toast";
import { setAuthUser, setSelectedUser } from "../../store/userSlice.js";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setSelectedUser(null));
            localStorage.removeItem("authUser");
        } catch (error) {
            console.log("Error in logout btn", error);
        }
    };
    return (
        <div>
            <div className="flex items-center cursor-pointer gap-1">
                <button
                    onClick={handleLogout}
                    className="flex backdrop-filter backdrop-blur-3xl bg-opacity-0 border border-red-900 text-white p-2 font-semibold rounded-md"
                >
                    <IoIosLogOut className="text-2xl" />
                    <span className="hidden md:block">LOGOUT</span>
                </button>
            </div>
        </div>
    );
}

export default Logout;
