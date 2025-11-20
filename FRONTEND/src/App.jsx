import React, { useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import{setOnlineUser} from './redux/userSlice'


const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const {socket} = useSelector(store=>store.socket)

  useEffect(() => {
    if (authUser) {
      const socketIo = io("http://localhost:8080", {
        query: { userId: authUser._id },
      });

      dispatch(setSocket(socketIo));

      socketIo?.on("getOnlineUser", (users) => {
        dispatch(setOnlineUser(users));
      });
      return ()=> socketIo.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
    }
  }, [authUser]);

  return (
    <div className="h-screen flex justify-center items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
