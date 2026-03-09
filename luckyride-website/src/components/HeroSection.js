import React from "react";

function HeroSection() {
  return (
    <div style={hero}>
      <h1 style={title}>Welcome to LuckyRide</h1>

      <p style={subtitle}>
        Book Autos, Cars and Travellers Anytime Anywhere
      </p>

      <button style={button}>Book Ride</button>
    </div>
  );
}

const hero = {
  background: "#f1f5f9",
  textAlign: "center",
  padding: "100px 20px"
};

const title = {
  fontSize: "48px",
  marginBottom: "20px"
};

const subtitle = {
  fontSize: "20px",
  marginBottom: "30px",
  color: "#555"
};

const button = {
  padding: "12px 25px",
  fontSize: "16px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default HeroSection;