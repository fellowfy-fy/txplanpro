import { useState } from "react";
import api from "../api/api";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/token/", formData); // Adjust the URL to your login endpoint
      console.log("Login successful:", response.data);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    } catch (error) {
      console.error("There was an error logging in:", error);
    }
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <form onSubmit={handleSubmit}>
        <div className="p-[24px]">
          <div className="py-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="p-2 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
            />
          </div>
          <div className="py-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-2 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
            />
          </div>
          <button
            className="bg-black text-white my-2 py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
