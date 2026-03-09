import React from "react";

function VehicleCard({ title, seats }) {
  return (
    <div style={styles.card}>

      <h2>{title}</h2>

      <p>{seats}</p>

      <button style={styles.button}>Book Now</button>

    </div>
  );
}

const styles = {

  card: {
    width: "250px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  button: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default VehicleCard;