import axios from "axios";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "web") {
    return "http://localhost:9090/api"; // web
  } else {
    return "http://192.168.1.13:9090/api"; // mobile (change if needed)
  }
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000 // ⏱️ VERY IMPORTANT
});

export default API;