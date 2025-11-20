import React from 'react'
import MessageContainer from '../components/chat/MessageContainer'
import Sidebar from '../components/sidebar/Sidebar'

function HomePage() {
    return (
        <div className='flex h-screen w-full bg-white overflow-hidden'>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default HomePage
