import React from "react";

function VehicleDisplayCard({ title, seats }) {

  const getIcon = () => {
    switch (title) {
      case "Auto":
        return "🛺";
      case "Car":
        return "🚗";
      case "Traveller":
        return "🚐";
      default:
        return "🚗";
    }
  };

  return (
    <div style={styles.card}>
      <h2>{getIcon()}</h2>
      <h3>{title}</h3>
      <p>{seats}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 10,
    width: 150,
    textAlign: "center",
    background: "white"
  }
};

export default VehicleDisplayCard;