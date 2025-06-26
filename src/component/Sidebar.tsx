import {useState} from "react";
import {Menu as MenuIcon, Package, Archive} from "react-feather";
import {Link} from "react-router-dom";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div
            className={`bg-gradient-to-r from-rose-200 to-rose-100 text-black shadow-xl ${
                isSidebarOpen ? "w-64" : "w-20"
            } transition-all duration-300 ease-in-out h-screen flex flex-col`}
        >
            <div className="p-4 flex flex-col h-full">
                <button
                    onClick={toggleSidebar}
                    className="text-black p-3 rounded-lg transition duration-300 hover:bg-black hover:text-white flex"
                >
                    <MenuIcon
                        className={`w-7 h-7 transform transition-transform ${
                            isSidebarOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {isSidebarOpen && (
                    <h1 className="text-2xl font-bold text-black mt-4">Inventory</h1>
                )}

                <ul className="flex flex-col space-y-4 mt-6">
                    <li>
                        <Link
                            to="/product"
                            className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-rose-400 to-rose-300 text-white transition duration-300 hover:bg-black hover:text-white shadow-md"
                        >
                            <Package className="w-6 h-6"/>
                            {isSidebarOpen && <span>Product</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/inventory"
                            className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-rose-400 to-rose-300 text-white transition duration-300 hover:bg-black hover:text-white shadow-md"
                        >
                            <Archive className="w-6 h-6"/>
                            {isSidebarOpen && <span>Inventory</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}