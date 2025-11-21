import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

function Messages() {
  useGetMessages();
  useGetRealTimeMessage()
  const {messages} = useSelector(store=>store.message);
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-200 text-gray-500 text-sm sm:text-base">
        No chat found
      </div>
    );
  }
  
  return (
      <div className="flex-1 w-full overflow-y-auto px-1 bg-neutral-200">
         {
          messages.map((msg,index)=>(
            <Message key={msg?._id || index} message={msg} />
          ))
         }
      </div>
  )
}

export default Messages;