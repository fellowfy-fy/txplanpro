// src/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-64 p-4 flex-1">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
