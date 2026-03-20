import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api" // your backend port
});

export const getDashboard = () => API.get("/admin/dashboard");

// GET all bookings
export const getBookings = () => API.get("/bookings");

// UPDATE booking status
export const updateBookingStatus = (id, status) =>
  API.put(`/bookings/${id}/status?status=${status}`);

// DELETE booking
export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);

export const getVehicles = () => API.get("/vehicles");

export const addVehicleAPI = (data) => API.post("/vehicles", data);

export const deleteVehicleAPI = (id) =>
  API.delete(`/vehicles/${id}`);

export const getDrivers = () => API.get("/drivers");

export const addDriverAPI = (data) => API.post("/drivers", data);

export const deleteDriverAPI = (id) =>
  API.delete(`/drivers/${id}`);

// ASSIGN DRIVER
export const assignDriverAPI = (bookingId, driver) =>
  API.put(`/bookings/${bookingId}/assign-driver`, driver);

export default API;