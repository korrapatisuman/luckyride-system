import API from "../api/api";

export const getBookings = () => API.get("/bookings");

export const createBooking = (data) =>
  API.post("/bookings", data);

export const updateBookingStatus = (id, status) =>
  API.put(`/bookings/${id}/status`, null, {
    params: { status },
  });

export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);

export const assignDriver = (bookingId, driver) =>
  API.put(`/bookings/${bookingId}/assign-driver`, driver);

// ✅ GET USER BOOKINGS
export const getUserBookings = (login) => {
  return API.get(`/bookings/user?login=${login}`);
};