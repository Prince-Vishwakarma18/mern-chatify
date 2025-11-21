import React from 'react'
import MessageContainer from '../../components/MessageContainer'
import Sidebar from '../../components/Sidebar'

function HomePage() {
    return (
        <div className='flex min-h-screen w-full sm:h-[450px]  md:h-[550px] bg-white overflow-x-hidden '>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default HomePage