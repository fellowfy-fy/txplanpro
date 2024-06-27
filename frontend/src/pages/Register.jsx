import { useState } from "react";
import api from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user.username", formData.username);
    data.append("user.password", formData.password);
    data.append("user.email", formData.email);

    try {
      const response = await api.post("/register/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("There was an error registering:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ml-10 bg-white rounded-3xl w-[95%]">
          <div className="p-[24px]">
            <div className="py-3">
              <label className="pr-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-200 rounded-lg border-gray-800"
              />
            </div>
            <div className="py-3">
              <label className="pr-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-200 rounded-lg border-gray-800"
              />
            </div>
            <div className="py-3">
              <label className="pr-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-200 rounded-lg border border-gray-800"
              />
            </div>
            <button
              className="bg-black text-white my-2 py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
