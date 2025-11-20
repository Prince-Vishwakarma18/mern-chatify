import React, { useState } from 'react'
import { FaHandsPraying, FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser, setSelectedUser } from '../redux/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("login data sending", user);

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        dispatch(setSelectedUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log("Error in login", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-400 flex flex-col justify-center items-center px-4">

      {/* Header */}
      <div className="pb-5">
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-2 text-white text-center">
          WELCOME BACK <FaHandsPraying />
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[80%] max-w-md px-6 py-4 rounded-2xl shadow-2xl bg-white"
      >
        <h1 className="text-center font-bold text-black text-3xl pt-2 pb-4">
          Login
        </h1>

        {/* Username */}
        <div className="flex items-center mb-5 border-b-2 border-gray-300 focus-within:border-blue-500">
          <FaRegUser className="mr-4 text-gray-600" />
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            placeholder="Enter Username"
            className="p-2 w-full outline-none text-blue-700 placeholder-gray-700"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-5 border-b-2 border-gray-300 focus-within:border-blue-500">
          <TbLockPassword className="mr-4 text-2xl text-gray-600" />
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter Password"
            className="p-2 w-full outline-none text-blue-700 placeholder-gray-700"
            required
          />
        </div>

        <div className="mb-5">
          <button className="bg-blue-600 p-3 w-full font-medium text-white rounded-full hover:bg-blue-800">
            LOGIN
          </button>
        </div>

        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to={"/signup"}
            className="font-semibold text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
