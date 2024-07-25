import React from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";

const Sidebar = () => {
    return (
        <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
            <Timer />
            <div className="text-white text-2xl font-semibold text-center">
                Admin Dashboard
            </div>
            <nav>
                <Link
                    to="/METTB01"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                    테이블조회
                </Link>
                <Link
                    to="/METTB02"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                    테이블등록
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
