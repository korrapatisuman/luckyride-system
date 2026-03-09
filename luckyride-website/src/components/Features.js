import React from "react";

function Features() {
  return (
    <div style={container}>

      <h2 style={title}>Our Services</h2>

      <div style={grid}>

        <div style={card}>
          <h3>Auto Rental</h3>
          <p>Affordable auto rides for city travel.</p>
        </div>

        <div style={card}>
          <h3>Car Rental</h3>
          <p>Comfortable cars for family and business trips.</p>
        </div>

        <div style={card}>
          <h3>Traveller Rental</h3>
          <p>12 & 24 seater travellers for group travel.</p>
        </div>

        <div style={card}>
          <h3>Easy Booking</h3>
          <p>Book vehicles quickly with our mobile app.</p>
        </div>

      </div>

    </div>
  );
}

const container = {
  padding: "60px 20px",
  textAlign: "center"
};

const title = {
  fontSize: "32px",
  marginBottom: "40px"
};

const grid = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap"
};

const card = {
  background: "#ffffff",
  padding: "20px",
  width: "220px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export default Features;