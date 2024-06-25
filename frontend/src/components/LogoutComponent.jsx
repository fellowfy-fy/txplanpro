// src/components/Logout.js

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const LogoutComponent = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    isAuthenticated ? console.log("good") : navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    // Remove tokens from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Update auth state
    logout();

    // Redirect to login page
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutComponent;
