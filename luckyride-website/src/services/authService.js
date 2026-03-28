import API from "../api/api";

export const sendOtp = (data) =>
  API.post("/auth/send-otp", data);

export const verifyOtp = (data) =>
  API.post("/auth/verify-otp", data);