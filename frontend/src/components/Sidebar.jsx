// src/components/Sidebar.jsx
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
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/all-plans" className="block py-2 px-4 hover:bg-gray-700">
              All plans
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/create" className="block py-2 px-4 hover:bg-gray-700">
              Create
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/settings" className="block py-2 px-4 hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
