import React, { useState } from 'react';
import Searchbar from './Searchbar';
import OtherUsers from './OtherUsers';
import Logout from './Logout';
import useGetOtherUsers from '../hooks/useGetOtherUsers.js';
import { useSelector } from 'react-redux';
// import useGetMessages from '../hooks/useGetMessages.js';

function Sidebar() {
    useGetOtherUsers();
    const { otherUsers } = useSelector((store) => store.user);
    const [search, setSearch] = useState("");

    // Safe filter logic
    const filteredUsers = (otherUsers || []).filter((user) =>
        user.fullName.toLowerCase().includes((search || "").toLowerCase())
    );

    if (!otherUsers || otherUsers.length === 0) {
        return (
            <div className='flex flex-col w-[300px] min-h-screen justify-center items-center'>
                <p>Loading users...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col w-[220px] sm:w-[250px] md:w-[280px] lg:w-[300px] h-screen bg-neutral-200 border-r border-black text-xs sm:text-sm md:text-base lg:text-lg'>
            <Searchbar setSearch={setSearch} />
            <div className="flex-1 overflow-y-auto px-2 py-2 scrollbar-none">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <OtherUsers key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-5">No users found</p>
                )}
            </div>
            <Logout />
        </div>
    );
}

export default Sidebar;
