// src/App.js

import { Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import LogoutComponent from "./components/LogoutComponent";

const App = () => {
  return (
    <div>
      <h1>JWT Authentication</h1>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
      </Routes>
    </div>
  );
};

export default App;
