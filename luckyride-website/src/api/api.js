import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api"
});

// ✅ ADD TOKEN AUTOMATICALLY
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ GLOBAL ERROR HANDLER
API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401 ||
        error.response?.status === 403) {

      console.log("🔐 Session expired");

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;