import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import MessageCntr from "../components/chats/MessageCntr";
import image from "../assets//bg.jpg";

function Home() {
    return (
        <div
            style={{ backgroundImage: `url(${image})` }}
            className=" h-dvh flex flex-col overflow-hidden bg-cover bg-center"
        >
            {/* Navbar */}
            <Navbar />

            {/* Sidebar + Message Center */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <MessageCntr />
            </div>
        </div>
    );
}

export default Home;
