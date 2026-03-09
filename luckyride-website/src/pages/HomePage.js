import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import VehicleCard from "../components/VehicleCard";
import BookingForm from "../components/BookingForm";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <HeroSection />

      {/* Booking Form */}
      <BookingForm />

      {/* Vehicle Section */}
      <div style={styles.vehicleSection}>

        <h2 style={styles.title}>Our Vehicles</h2>

        <div style={styles.vehicleGrid}>
          <VehicleCard title="Auto" seats="3 Seater" />
          <VehicleCard title="Car" seats="4+1 Seater" />
          <VehicleCard title="Traveller" seats="12 / 24 Seater" />
        </div>

      </div>

      {/* Features */}
      <Features />

    </div>
  );
}

const styles = {

  vehicleSection: {
    padding: "60px 20px",
    textAlign: "center"
  },

  title: {
    marginBottom: "30px"
  },

  vehicleGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  }

};

export default Home;