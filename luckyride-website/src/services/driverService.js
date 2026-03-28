import API from "../api/api";

export const getDrivers = () => API.get("/drivers");

export const addDriver = (data) =>
  API.post("/drivers", data);

export const deleteDriver = (id) =>
  API.delete(`/drivers/${id}`);