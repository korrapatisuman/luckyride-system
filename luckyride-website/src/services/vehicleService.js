import API from "../api/api";

// 🚗 NORMAL VEHICLES
export const getVehicles = () =>
  API.get("/web/vehicles");

// 🚗 CREATE VEHICLE
export const createVehicle = (data) =>
  API.post("/admin/vehicles", data);

// 🚗 DELETE VEHICLE
export const deleteVehicle = (id) =>
  API.delete(`/admin/vehicles/${id}`);

// 🛒 MARKETPLACE VEHICLES
export const getMarketplaceVehicles = () =>
  API.get("/marketplace/vehicles");

// 🛒 ADD MARKETPLACE VEHICLE
export const addMarketplaceVehicle = (data) =>
  API.post("/marketplace/vehicles", data);

// 🛒 DELETE MARKETPLACE VEHICLE
export const deleteMarketplaceVehicle = (id) =>
  API.delete(`/admin/marketplace/${id}`);