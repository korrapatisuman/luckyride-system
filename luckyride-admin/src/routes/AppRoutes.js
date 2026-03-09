import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import VehiclesPage from "../pages/VehiclesPage";
import DriversPage from "../pages/DriversPage";
import BookingsPage from "../pages/BookingsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
    </Routes>
  );
}

export default AppRoutes;