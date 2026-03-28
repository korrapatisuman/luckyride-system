import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api"
});

// ✅ FIXED INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req; // ✅ VERY IMPORTANT
});

// ================= GLOBAL ERROR HANDLER =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      alert("🔐 Session expired. Please login again.");
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }

    if (status === 500) {
      console.error("🚨 Server Error:", error.response?.data);
    }

    return Promise.reject(error);
  }
);

// ================= AUTH =================
export const adminLogin = (data) =>
  API.post("/admin/login", data);

// ================= DASHBOARD =================
export const getDashboardData = () =>
  API.get("/admin/dashboard");

// ================= BOOKINGS =================
export const getAllBookings = () =>
  API.get("/admin/bookings");   // ✅ FIXED

export const updateBookingStatus = (id, status) =>
  API.put(`/admin/bookings/${id}/status`, null, {
    params: { status }
  });

export const deleteBookingById = (id) =>
  API.delete(`/admin/bookings/${id}`);

export const assignDriver = (bookingId, driver) =>
  API.put(`/admin/bookings/${bookingId}/assign-driver`, driver);

// ================= VEHICLES =================
export const getAllVehicles = () =>
  API.get("/admin/vehicles");   // ✅ FIXED

export const createVehicle = (data) =>
  API.post("/admin/vehicles", data);

export const deleteVehicleById = (id) =>
  API.delete(`/admin/vehicles/${id}`);

// ================= DRIVERS =================
export const getAllDrivers = () =>
  API.get("/admin/drivers");   // ✅ FIXED

export const createDriver = (data) =>
  API.post("/admin/drivers", data);

export const deleteDriverById = (id) =>
  API.delete(`/admin/drivers/${id}`);

// ================= MARKETPLACE =================
export const getAllMarketplaceVehicles = () =>
  API.get("/admin/marketplace");   // ✅ FIXED

export const approveVehicle = (id) =>
  API.put(`/admin/marketplace/${id}/approve`);

export const rejectVehicle = (id) =>
  API.put(`/admin/marketplace/${id}/reject`);

export const deleteMarketplaceVehicleById = (id) =>
  API.delete(`/admin/marketplace/${id}`);

export default API;