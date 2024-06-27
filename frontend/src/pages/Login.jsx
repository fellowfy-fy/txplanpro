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
            <label className="pr-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-200 rounded-lg border border-gray-800"
            />
          </div>
          <div className="py-3">
            <label className="pr-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-200 rounded-lg border border-gray-800"
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
