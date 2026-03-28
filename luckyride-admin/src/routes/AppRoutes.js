import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import BookingsPage from "../pages/BookingsPage";
import DriversPage from "../pages/DriversPage";
import VehiclesPage from "../pages/VehiclesPage";
import AdminMarketplace from "../pages/AdminMarketplace";

import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🔓 Public */}
      <Route path="/" element={<LoginPage />} />

      {/* 🔐 Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="drivers" element={<DriversPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="marketplace" element={<AdminMarketplace />} />
      </Route>

    </Routes>
  );
}