import API from "../api/api";

// ✅ GET ALL DRIVERS
export const getDrivers = () =>
  API.get("/web/drivers");

// ✅ CREATE DRIVER
export const createDriver = (data) =>
  API.post("/admin/drivers", data);

// ✅ DELETE DRIVER
export const deleteDriver = (id) =>
  API.delete(`/admin/drivers/${id}`);