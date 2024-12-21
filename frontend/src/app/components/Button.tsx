'use client'

import { useState } from "react";
import Sidebar from "./Sidebar";

const MenuButton = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <button
                className="border-none text-4xl text-black cursor-pointer"
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
};

export default MenuButton;

