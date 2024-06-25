import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700">
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/about" className="block py-2 px-4 hover:bg-gray-700">
              About
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/contact" className="block py-2 px-4 hover:bg-gray-700">
              Contact
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
