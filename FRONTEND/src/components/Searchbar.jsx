import React from 'react';
import { CiSearch } from "react-icons/ci";

function Searchbar({setSearch}) {
    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='bg-white shadow-[0_7px_9px_rgba(0,0,0,0.2)]'>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center border-b  border-black focus-within:border-blue-500 transition-colors duration-300'>
                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder='Search user...'
                        className='w-full p-4 outline-none text-black'
                    />
                    <button type='submit'>
                        <CiSearch className='text-2xl text-black' />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Searchbar;
