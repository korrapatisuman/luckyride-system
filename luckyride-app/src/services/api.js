import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "web") {
    return "http://localhost:9090/api";
  } else {
    return "http://192.168.1.10:9090/api"; // your system IP
  }
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000
});

API.interceptors.request.use(
  async (config) => {

    const token = await AsyncStorage.getItem("token");

    console.log("🔐 TOKEN FROM STORAGE:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const getMyBookings = (login) =>
  API.get(`/mobile/bookings/my?login=${login}`);

export const createBooking = (data) =>
  API.post("/mobile/bookings", data);

export const updateBookingStatus = (id, status) =>
  API.put(`/bookings/${id}/status`, null, {
    params: { status },
  });

export const getVehicles = () =>
  API.get("/mobile/vehicles");

export default API;