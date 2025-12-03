import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { CiUser, CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../services/api.js";
import { setAuthUser } from "../store/userSlice.js";
import toast from "react-hot-toast";
import image from "../assets//bg.jpg";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/login", user, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.dismiss()
                toast.success(res.data.message);
                dispatch(setAuthUser(res.data.user));
                navigate("/home");
            }
        } catch (error) {
            console.log("Error in login page", error);
            toast.dismiss();
            toast.error(error.response?.data?.message || "login failed");
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${image})` }}
            className="h-dvh flex flex-col justify-center items-center px-4 bg-cover bg-center "
        >
            {/* Greet msg */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center pb-6 text-blue-600">
                WELCOME TO CHATIFY
            </h2>
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md rounded-2xl shadow-2xl border pt-6 pb-5 px-10 text-white "
            >
                {/* Header */}
                <div className="flex flex-col justify-center items-center mt-1">
                    <FaUserAlt className="text-blue-500 text-5xl" />
                    <h1 className="mt-2 font-semibold text-lg">WELCOME BACK</h1>
                    <h5 className="text-gray-300 text-sm">
                        Log in to your account
                    </h5>
                </div>

                {/* Username */}
                <div className="flex items-center border-blue-500 border-b-2 pb-1 mt-6 gap-2">
                    <CiUser className="text-blue-500 text-xl" />
                    <input
                        type="text"
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        placeholder="Username"
                        className="w-full outline-none bg-transparent text-white placeholder-gray-300"
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex items-center mt-6 border-blue-500 border-b-2 pb-1 gap-2">
                    <CiLock className="text-xl text-blue-500" />
                    <input
                        type="password"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder="Password"
                        className="w-full outline-none bg-transparent text-white placeholder-gray-300"
                        required
                    />
                </div>

                {/* Btn */}
                <div className="mt-6 mb-3">
                    <button className="px-2 py-2 rounded-sm w-full bg-blue-700 text-white hover:bg-blue-800 transition">
                        LOGIN
                    </button>
                </div>

                {/* Create account */}
                <div className="text-center text-gray-400 pb-3">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-400 font-semibold">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
