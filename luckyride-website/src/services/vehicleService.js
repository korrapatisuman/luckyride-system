import API from "../api/api";

// 🚗 NORMAL VEHICLES
export const getVehicles = () => API.get("/vehicles");

export const createVehicle = (data) => API.post("/vehicles", data);

export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);

// 🛒 MARKETPLACE
export const getMarketplaceVehicles = () =>
  API.get("/marketplace/approved");

export const addMarketplaceVehicle = (data) =>
  API.post("/marketplace", data);

export const deleteMarketplaceVehicle = (id) =>
  API.delete(`/marketplace/${id}`);