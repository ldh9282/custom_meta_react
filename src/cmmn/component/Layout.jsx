import React from "react";
import Sidebar from "./Sidebar";
const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-10 text-2xl font-bold bg-gray-100 min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default Layout;
