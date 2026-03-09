import React, { useState } from "react";

function BookingForm() {

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState("Auto");

  const handleBooking = () => {

    alert(
      "Booking Requested\n\nPickup: " +
      pickup +
      "\nDrop: " +
      drop +
      "\nVehicle: " +
      vehicle
    );

  };

  return (
    <div style={styles.container}>

      <h2>Book Your Ride</h2>

      <input
        style={styles.input}
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Drop Location"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
      />

      <select
        style={styles.input}
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option>Auto</option>
        <option>Car</option>
        <option>Traveller</option>
      </select>

      <button
        style={styles.button}
        onClick={handleBooking}
      >
        Book Ride
      </button>

    </div>
  );
}

const styles = {

  container: {
    background: "white",
    padding: "30px",
    width: "350px",
    margin: "40px auto",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    border: "none",
    background: "#16a34a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default BookingForm;