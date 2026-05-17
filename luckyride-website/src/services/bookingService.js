import API from "../api/api";

// ✅ GET MY BOOKINGS
export const getMyBookings = (login) =>
  API.get(`/web/bookings/my?login=${login}`);

// ✅ CREATE BOOKING
export const createBooking = (data) =>
  API.post("/web/bookings", data);

// ✅ UPDATE BOOKING STATUS
export const updateBookingStatus = (id, status) =>
  API.put(`/bookings/${id}/status`, null, {
    params: { status },
  });

// ✅ DELETE BOOKING
export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);

// ✅ ASSIGN DRIVER
export const assignDriver = (bookingId, driver) =>
  API.put(`/bookings/${bookingId}/assign-driver`, driver);