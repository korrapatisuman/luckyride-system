import API from "../api/api";

// ✅ SEND OTP
export const sendOtp = (data) =>
  API.post("/auth/send-otp", data);

// ✅ VERIFY OTP
export const verifyOtp = (data) =>
  API.post("/auth/verify-otp", data);