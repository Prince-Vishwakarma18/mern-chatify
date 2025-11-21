import React, { useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket, clearSocket } from './redux/socketSlice';
import { setOnlineUser } from './redux/userSlice';
import { BASE_URL } from './baseURL.js';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {

  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.user.authUser);
  const socket = useSelector((store) => store.socket.socket);

  useEffect(() => {
    if (!authUser || !authUser._id) {
      if (socket) {
        console.log("Disconnecting socket because no authUser...");
        socket.disconnect();
      }
      dispatch(clearSocket());
      return;
    }

    if (!socket) {
      console.log("Connecting socket to:", BASE_URL);

      const socketIo = io(BASE_URL, {
        transports: ["websocket"], 
        query: { userId: authUser._id },
        withCredentials: true,
      });

      socketIo.on("connect", () => {
        console.log(" SOCKET CONNECTED:", socketIo.id);
      });

      socketIo.on("connect_error", (err) => {
        console.log(" SOCKET ERROR:", err);
      });

      socketIo.on("getOnlineUsers", (users) => {
        console.log("ONLINE USERS:", users);
        dispatch(setOnlineUser(users));
      });

      dispatch(setSocket(socketIo));
    }
  }, [authUser?._id]);

  return <RouterProvider router={router} />;
}

export default App;
