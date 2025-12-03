import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { BsGenderAmbiguous } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api.js";
import { toast } from "react-hot-toast";
import image from "../assets//bg.jpg";

function Signup() {
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState("");

    const [user, setUser] = useState({
        profilePic: "",
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    //For handle the profile image
    const handleProfileImage = (file) => {
        // remove the older image
        if (profileImg) {
            URL.revokeObjectURL(profileImg);
        }
        setUser((prev) => ({
            ...prev,
            profilePic: file,
        }));
        const imageURL = URL.createObjectURL(file);
        setProfileImg(imageURL);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Signup Data", user);
        const formData = new FormData();
        formData.append("profilePic", user.profilePic);
        formData.append("fullName", user.fullName);
        formData.append("username", user.username);
        formData.append("password", user.password);
        formData.append("confirmPassword", user.confirmPassword);
        formData.append("gender", user.gender);
        try {
            const res = await axiosInstance.post("/auth/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.dismiss()
                toast.success(res.data.message);
                setUser({
                    profilePic: "",
                    fullName: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    gender: "",
                });
                setProfileImg("");
                navigate("/login");
            }
        } catch (error) {
            console.log("Error in Signup Form", error);
            toast.dismiss();
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };
    return (
        <div
            style={{ backgroundImage: `url(${image})` }}
            className="h-dvh w-full text-black flex items-center justify-center flex-col overflow-hidden bg-cover bg-center "
        >
            {/* Heading */}
            <div className="flex justify-center items-center ">
                <h2 className="text-2xl sm:text-3xl font-bold text-center pb-5 text-blue-600  ">
                    WELCOME TO CHATIFY
                </h2>
            </div>

            {/* Form  */}
            <div className="flex justify-center items-center w-full ">
                <form
                    onSubmit={handleSubmit}
                    className=" text-white border border-white w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md rounded-2xl shadow-2xl pt-1 px-10"
                >
                    {/*Photo Upload */}
                    <div className="flex flex-col justify-center items-center gap-2 pt-1">
                        <div className="h-20 w-20 border rounded-full overflow-hidden">
                            <img
                                src={
                                    profileImg ||
                                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                }
                                className="h-20 w-20 object-center object-cover"
                                alt=""
                            />
                        </div>
                        {/* Upload profilePic btn */}
                        <label className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition">
                            Upload Photo
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleProfileImage(e.target.files[0])
                                }
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>
                    {/* Fullname */}
                    <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                        <CiUser className="text-blue-500 text-xl" />
                        <input
                            type="text"
                            onChange={(e) => {
                                setUser({ ...user, fullName: e.target.value });
                            }}
                            placeholder="Full Name"
                            className="w-full outline-none "
                            required
                        />
                    </div>
                    {/* Username */}
                    <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                        <CiUser className="text-blue-500 text-xl" />
                        <input
                            type="text"
                            onChange={(e) => {
                                setUser({ ...user, username: e.target.value });
                            }}
                            placeholder="Username"
                            className="w-full outline-none "
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                        <CiLock className="text-blue-500 text-xl" />
                        <input
                            type="password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            placeholder="Password"
                            className="outline-none w-full"
                            required
                        />
                    </div>
                    {/* Confirm password */}
                    <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                        <CiLock className="text-blue-500 text-xl" />
                        <input
                            type="password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    confirmPassword: e.target.value,
                                })
                            }
                            placeholder="Confirm Password"
                            className="outline-none w-full"
                            required
                        />
                    </div>
                    {/* Gender */}
                    <div className="w-full border-b-2 border-blue-500 py-2 flex items-center gap-10 mb-2">
                        <BsGenderAmbiguous className="text-lg text-cyan-400" />
                        {/* Male */}
                        <label className="flex items-center text-gray-300 gap-2">
                            MALE
                            <input
                                type="radio"
                                value="male"
                                checked={user.gender === "male"}
                                onChange={(e) =>
                                    setUser({ ...user, gender: e.target.value })
                                }
                                name="gender"
                            />
                        </label>
                        {/* Female */}
                        <label className="flex items-center text-gray-300 gap-2">
                            FEMALE
                            <input
                                type="radio"
                                value="female"
                                checked={user.gender === "female"}
                                onChange={(e) =>
                                    setUser({ ...user, gender: e.target.value })
                                }
                                name="gender"
                            />
                        </label>
                    </div>
                    {/* Button */}
                    <div className=" flex justify-center pt-5 pb-2">
                        <button className="px-2 py-2 rounded-sm w-full bg-blue-700 hover:bg-blue-800 transition">
                            SIGNUP
                        </button>
                    </div>
                    {/* Navigate to login */}
                    <div className="text-center text-gray-600 pb-5">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 font-semibold"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
