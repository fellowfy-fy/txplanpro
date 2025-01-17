// src/hooks/useRefreshToken.js

import api from "../api/api";

const useRefreshToken = () => {
  const refresh = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    try {
      const response = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
