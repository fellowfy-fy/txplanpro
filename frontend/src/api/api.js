import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await api.post("token/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("access_token", response.data.access);
          api.defaults.headers["Authorization"] =
            "Bearer " + response.data.access;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access;
          return api(originalRequest);
        } catch (err) {
          console.error(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
