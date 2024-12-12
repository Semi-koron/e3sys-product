'use client'

import { useState } from "react";
import MenuButton from "./Button";
import Sidebar from "./Sidebar";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <header className="flex items-center justify-between relative mb-6">
            <MenuButton onClick={toggleSidebar} />
            <h1 className="text-4xl text-black mx-auto m-0">タイトル</h1>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </header>
    );
};

export default Header;