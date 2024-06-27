import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100  fixed flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-light">TxPlanPro</h1>
      </div>
      <nav className="flex-1 px-6">
        <ul>
          <p className="p-4 font-light text-[14px]">MENU</p>
          <div className="pl-4 text-[14px]">
            <li>
              <NavLink
                to="/dashboard"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3 "
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-plans"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                All Plans
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/present"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Ready to present
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/todo"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                To-do plans
              </NavLink>
            </li> */}
            {/* плейсхолдер */}
            <p className="p-4 font-light text-[14px]">Dr. JOHN DOE</p>
            <li>
              <NavLink
                to="/login"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Create
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/patients"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Patients
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/settings"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Settings
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/help"
                className="active:bg-gray-900 active:text-gray-200 block px-4 text-gray-900 rounded-[48px] hover:text-gray-500 py-3"
              >
                Help & Support
              </NavLink>
            </li> */}
          </div>
          {/* <li>
            <NavLink
              to="/search"
              className="py-2 my-4 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
            >
              Search
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
