import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
