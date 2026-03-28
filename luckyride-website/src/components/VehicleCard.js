import React from "react";

function VehicleCard({ type, selected, onSelect }) {

  const getIcon = () => {
    switch (type) {
      case "Auto":
        return "🛺";
      case "Car 4+1":
        return "🚗";
      case "Traveller 12 Seater":
        return "🚐";
      default:
        return "🚗";
    }
  };

  const handleClick = () => {
    if (typeof onSelect === "function") {
      onSelect(type);
    } else {
      console.error("❌ onSelect is not a function:", onSelect);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: selected === type ? "2px solid green" : "1px solid #ddd",
        padding: 15,
        cursor: "pointer",
        textAlign: "center",
        borderRadius: 10,
        width: "100%"
      }}
    >
      <h2>{getIcon()}</h2>
      <p>{type}</p>
    </div>
  );
}

export default VehicleCard;