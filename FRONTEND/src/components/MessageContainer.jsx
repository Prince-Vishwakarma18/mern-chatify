import React, { useEffect } from 'react';
import Messages from './Messages';
import SendMessage from './SendMessage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MessageContainer() {
    const { selectedUser, authUser } = useSelector((store) => store.user);
    // Redirect to login if user is not loggedin
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!authUser) {
    //         navigate('/login');
    //     }
    // }, [authUser, navigate]);
    
    if (!selectedUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 text-gray-600">
                <h2 className="font-semibold text-black">Hey, {authUser?.fullName}</h2>
                <h2 className="text-xl font-semibold">let's start conversation</h2>
            </div>
        );
    }
  return (
      <div className="flex flex-col h-screen w-full shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-4 p-2 bg-white shadow-md border-b border-black">
              <div className="avatar avatar-online">
                  <div className="w-11 rounded-full">
                      <img
                          src={
                              selectedUser.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
                          }
                          alt="user"
                      />
                  </div>
              </div>
              <div>
                  <h1 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg">
                     {selectedUser.username}
                  </h1>
              </div>
          </div>

          <Messages />
          <SendMessage />
      </div>
  )
}

export default MessageContainer