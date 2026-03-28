import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import OtpLoginPage from "./pages/OtpLoginPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import MyBookings from "./pages/MyBookings";
import BuyVehicles from "./pages/BuyVehicles";
import SellVehicle from "./pages/SellVehicle";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        
        <Navbar />

        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<OtpLoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/buy" element={<BuyVehicles />} />
            <Route path="/sell" element={<SellVehicle />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    height: "100vh",        // 🔥 full screen
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"      // ❌ stop full page scroll
  },

  mainContent: {
    flex: 1,
    marginTop: "80px",      // navbar height
    marginBottom: "90px",   // footer height
    overflowY: "auto",      // ✅ ONLY THIS SCROLLS
    padding: "10px"
  }
};

export default App;