import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CiChat2 } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { BsGenderAmbiguous } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
        profilePhoto:null,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", user.fullName);
        formData.append("username", user.username);
        formData.append("password", user.password);
        formData.append("confirmPassword", user.confirmPassword);
        formData.append("gender", user.gender);
        formData.append("profilePhoto", user.profilePhoto); // file

        try {
            const res = await axios.post(
                "http://localhost:8080/api/users/register",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="w-full min-h-screen bg-cyan-300 flex justify-center items-center flex-col">
            {/* Header */}
            <div className="flex justify-center items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 flex justify-center items-center  gap-1">
                    Welcome To Chatify
                    <CiChat2 className="text-4xl sm:text-5xl text-amber-700 mt-2" />
                </h2>
            </div>

            {/* Signup Form */}
            <div className="flex justify-center items-center w-full mt-3 px-2">
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className="bg-white w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md rounded-2xl p-7  shadow-2xl"
                >
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        Create Your Account
                    </h1>

                    {/* Fullname */}
                    <div className="flex items-center border-b-2 border-black mb-3 focus-within:border-blue-500">
                        <FaRegUser className="mr-3 text-lg text-cyan-400" />
                        <input
                            value={user.fullName}
                            onChange={(e) =>
                                setUser({ ...user, fullName: e.target.value })
                            }
                            type="text"
                            placeholder="Full Name"
                            className="w-full py-2 outline-none text-gray-700 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div className="flex items-center border-b-2 border-black mb-3 focus-within:border-blue-500 ">
                        <FaRegUser className=" mr-3 text-lg text-cyan-400" />
                        <input
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                            type="text"
                            placeholder="Username"
                            className="w-full py-2 outline-none text-gray-700 placeholder-gray-400"
                            required
                        />
                    </div>
                    {/* ProflePhoto */}
                    <div className="flex items-center border-b-2 border-black mb-3 focus-within:border-blue-500 ">
                        <FaRegUser className=" mr-3 text-lg text-cyan-400" />
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                            placeholder="Select profile Photo"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    profilePhoto: e.target.files[0],
                                })
                            }
                            className="w-full py-2 outline-none text-gray-700 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center border-b-2 border-black mb-3 focus-within:border-blue-500 ">
                        <TbLockPassword className=" mr-3 text-lg text-cyan-400" />
                        <input
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password"
                            className="w-full py-2 outline-none text-gray-700 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex items-center border-b-2 border-black mb-3 focus-within:border-blue-500 ">
                        <TbLockPassword className=" mr-3 text-lg text-cyan-400" />
                        <input
                            value={user.confirmPassword}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    confirmPassword: e.target.value,
                                })
                            }
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full py-2 outline-none text-gray-700 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex justify-center items-center border-b-2 border-black mb-5 pb-2 focus-within:border-blue-500">
                        <BsGenderAmbiguous className="text-lg sm:mb-0 text-cyan-400" />
                        <div className="flex justify-around w-full text-gray-700  sm:mb-0">
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    checked={user.gender === "male"}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            gender: e.target.value,
                                        })
                                    }
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="accent-blue-500"
                                />
                                Male
                            </label>

                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    checked={user.gender === "female"}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            gender: e.target.value,
                                        })
                                    }
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="accent-blue-500 bg"
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button className="bg-blue-600 p-3 w-full font-medium text-white rounded-full border-none hover:bg-blue-800 transition">
                            SIGN UP
                        </button>
                    </div>

                    <div>
                        <p className="text-center  text-gray-600 mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
