import axios from "axios";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "web") {
    return "http://localhost:9090/api";
  } else {
    return "http://192.168.1.5:9090/api"; // your system IP
  }
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000
});

// 🔐 Attach token (VERY IMPORTANT)
API.interceptors.request.use((config) => {
  if (global.userToken) {
    config.headers.Authorization = `Bearer ${global.userToken}`;
  }
  return config;
});

// 🚨 Handle errors
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API ERROR:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default API;