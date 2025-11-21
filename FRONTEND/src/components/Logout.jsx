import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users/logout", {
        withCredentials: true,
      });
      navigate('/login')
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log("Error in logout btn", error);
    }
  }
  return (
    <div>
      <div>
        <div className="bg-white p-3">
          <button onClick={logoutHandler} className="btn btn-neutral btn-outline w-full">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Logout