import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 text-gray-900 fixed flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">TxPlanPro</h1>
      </div>
      <p className="py-2.5 px-4">Menu</p>
      <nav className="flex-1 px-6">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block py-2.5 px-4 text-gray-900 ${
                  isActive
                    ? "bg-gray-900 text-gray-100 rounded-[48px]"
                    : "hover:gray-800"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `block py-2.5 px-4 text-gray-900 ${
                  isActive
                    ? "bg-gray-900 text-gray-100 rounded-[48px]"
                    : "hover:gray-800"
                }`
              }
            >
              Create
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block py-2.5 px-4 text-gray-900 ${
                  isActive
                    ? "bg-gray-900 text-gray-100 rounded-[48px]"
                    : "hover:gray-800"
                }`
              }
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-plans"
              className={({ isActive }) =>
                `block py-2.5 px-4 text-gray-900 ${
                  isActive
                    ? "bg-gray-900 text-gray-100 rounded-[48px]"
                    : "hover:gray-800"
                }`
              }
            >
              All Plans
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
