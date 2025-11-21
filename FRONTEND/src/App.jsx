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

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.user.authUser);
  const socket = useSelector((store) => store.socket.socket);

  useEffect(() => {
    if (!authUser) {
      // LOGOUT
      if (socket) socket.close();
      dispatch(clearSocket());
      return;
    }

    // login case: always create a NEW socket
    const socketIo = io("http://localhost:3000", {
      query: { userId: authUser._id },
    });

    dispatch(setSocket(socketIo));

    // online user listener
    const handleOnlineUsers = (users) => {
      dispatch(setOnlineUser(users));
    };

    socketIo.on("getOnlineUsers", handleOnlineUsers);

    // cleanup
    return () => {
      socketIo.off("getOnlineUsers", handleOnlineUsers);
      socketIo.close();
    };

  }, [authUser]);

  return (
    <div className="h-screen flex justify-center items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
