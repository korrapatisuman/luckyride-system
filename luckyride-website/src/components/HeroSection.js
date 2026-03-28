import React from "react";
import BookingForm from "./BookingForm";

function HeroSection() {
  return (
    <div style={styles.hero}>

      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.content}>

        {/* Left Side */}
        <div style={styles.left}>
          <h1 style={styles.title}>
              Smart Vehicle Rentals, Anytime 🚖
          </h1>

           <p style={styles.subtitle}>
           Reliable autos, cars & travellers for local and outstation trips.
           Book instantly with transparent pricing.
          </p>
        </div>

        {/* Right Side - Booking Form */}
        <div style={styles.right}>
          <BookingForm />
        </div>

      </div>
    </div>
  );
}

const styles = {
  hero: {
    height: "90vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1502877338535-766e1452684a')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.55)"

  },

  content: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    height: "calc(100vh - 70px)",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: "0 60px",
    color: "white",
    marginTop: "70px"
  },

  left: {
    width: "50%"
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px",
    color:"yellow"
  },

  subtitle: {
    fontSize: "18px",
    color:"white",
    opacity: 0.9
  },

  right: {
    width: "35%"
  }
};

export default HeroSection;