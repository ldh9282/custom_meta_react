import React from "react";
import { Link, useLocation } from "react-router-dom";
import Timer from "./Timer";

const Sidebar = () => {
    const location = useLocation();
    const currentUrl = location.pathname;

    const navItems = [
        { url: "/METSC02", label: "스키마생성", icon: "bi bi-grid" },
        { url: "/METTB02", label: "테이블생성", icon: "bi bi-grid" },
        { url: "/METTB01", label: "테이블조회", icon: "bi bi-grid" },
        { url: "/METCU01", label: "컬럼조회", icon: "bi bi-grid" },
        { url: "/METSE01", label: "시퀀스조회", icon: "bi bi-grid" },
        { url: "/METCE01", label: "컬럼영문명", icon: "bi bi-grid" },
        { url: "/METUT01", label: "sql2ExcelConverter", icon: "bi bi-grid" },
        { url: "/METUT02", label: "camel2Snake", icon: "bi bi-grid" },
    ];

    return (
        <aside className="flex flex-col h-screen bg-gray-800 text-white w-64 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <div className="text-left text-2xl font-semibold ml-4 mb-4 mt-6">
                    스키마
                </div>
                <ul className="space-y-1">
                    <li className="nav-item">
                        <Link
                            to="/METSC02"
                            className={`nav-link block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                                currentUrl === "/METSC02" ? "bg-gray-700" : ""
                            }`}
                        >
                            <span className="ml-2">스키마생성</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/METTB02"
                            className={`nav-link block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                                currentUrl === "/METTB02" ? "bg-gray-700" : ""
                            }`}
                        >
                            <span className="ml-2">테이블생성</span>
                        </Link>
                    </li>
                </ul>
                <div className="text-left text-2xl font-semibold ml-4 mb-4 mt-6">
                    DB오브젝트관리
                </div>
                <ul className="space-y-1">
                    <li className="nav-item">
                        <Link
                            to="/METTB01"
                            className={`nav-link block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                                currentUrl === "/METTB01" ? "bg-gray-700" : ""
                            }`}
                        >
                            <span className="ml-2">테이블조회</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/METCU01"
                            className={`nav-link block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                                currentUrl === "/METCU01" ? "bg-gray-700" : ""
                            }`}
                        >
                            <span className="ml-2">컬럼조회</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/METSE01"
                            className={`nav-link block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                                currentUrl === "/METSE01" ? "bg-gray-700" : ""
                            }`}
                        >
                            <span className="ml-2">시퀀스조회</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
