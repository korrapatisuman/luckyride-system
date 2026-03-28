import React, { useState } from "react";
import { useEffect } from "react";
import MapPicker from "./MapPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../services/bookingService";
import VehicleCard from "./VehicleCard";
import { useNavigate } from "react-router-dom";



function BookingForm() {

  const [form, setForm] = useState({
    tripType: "LOCAL",
    vehicleType: "Auto",
    pickupLocation: "",
    dropLocation: "",
    days: 1
  });


  const vehicles = ["Auto", "Car 4+1", "Traveller 12 Seater"];
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [distance, setDistance] = useState(0); // default
  const [pickupDate, setPickupDate] = useState(new Date());
  const [success, setSuccess] = useState(null);
  // ✅ ADD HERE
  const [showMap, setShowMap] = useState(false);
  const [selecting, setSelecting] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const login = localStorage.getItem("login");

  if (!login) {
    alert("Please login first 🔐");
    navigate("/login");
  }
}, []);

useEffect(() => {
  const fetchDistance = async () => {
    if (!pickupCoords || !dropCoords) return;

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${pickupCoords.lng},${pickupCoords.lat};${dropCoords.lng},${dropCoords.lat}?overview=false`;

      const res = await fetch(url);
      const data = await res.json();

      const km = data.routes[0].distance / 1000;
      setDistance(Number(km.toFixed(2)));
    } catch (err) {
      console.log("Distance error", err);
    }
  };

  fetchDistance();
}, [pickupCoords, dropCoords]);

  // 💰 Fare calculation
  const calculateFare = () => {
    const distanceValue = distance || 10;
    const days = form.days || 1;

    let rate = 20;

    switch (form.vehicleType.toLowerCase()) {
      case "auto":
        rate = 10;
        break;
      case "car 4+1":
        rate = 20;
        break;
      case "traveller 12 seater":
        rate = 30;
        break;
      default:
        rate = 20;
    }

    let totalKm;

    if (form.tripType === "LOCAL") {
      totalKm = 80 * days;
    } else {
      const roundTrip = distance * 2;
      const minKm = days * 300;
      totalKm = Math.max(roundTrip, minKm);
    }

    return totalKm * rate;
  };

   const handleBooking = async () => {
  if (!form.pickupLocation || !form.dropLocation) {
    alert("Please fill all fields");
    return;
  }

  try {
    const login = localStorage.getItem("login");

    if (!login) {
      alert("Please login again 🔐");
      navigate("/login");
      return;
    }

    const payload = {
      ...form,
      pickupDate,
      distance,
      status: "REQUESTED"
    };

    if (login.includes("@")) {
      payload.userEmail = login;
    } else {
      payload.userPhone = login;
    }

    const res = await createBooking(payload);

    alert("Booking Created 🚖");

    navigate("/mybookings"); // ✅ IMPORTANT

  } catch (err) {
    console.error(err);
    alert("Booking Failed ❌");
  }
};

 return (
  <div style={styles.container}>

    <h2>Book Your Ride</h2>

    {/* 1. Trip Type */}
    <select
      style={styles.input}
      value={form.tripType}
      onChange={(e) =>
        setForm({ ...form, tripType: e.target.value })
      }
    >
      <option value="LOCAL">Local</option>
      <option value="OUTSTATION">Outstation</option>
    </select>

    {/* 2. Vehicle Selection */}
    <div style={styles.vehicleRow}>
      {vehicles.map((v) => (
        <VehicleCard
          key={v}
          type={v}
          selected={form.vehicleType}
          onSelect={(type) =>
            setForm({ ...form, vehicleType: type })
          }
        />
      ))}
    </div>

    {/* Mobile Number */}
    <input
       placeholder="Mobile Number"
       style={styles.input}
       value={form.userPhone || ""}
       onChange={(e) =>
       setForm({ ...form, userPhone: e.target.value })
      }
    />

    {/* Pickup */}
<div style={styles.locationRow}>
  <input
    placeholder="Pickup Location"
    style={styles.locationInput}
    value={form.pickupLocation}
    onChange={(e) =>
      setForm({ ...form, pickupLocation: e.target.value })
    }
  />

  <button
    style={styles.mapBtn}
    onClick={() => {
      setSelecting("pickup");
      setShowMap(true);
    }}
  >
    📍
  </button>
</div>

{/* Drop */}
<div style={styles.locationRow}>
  <input
    placeholder="Drop Location"
    style={styles.locationInput}
    value={form.dropLocation}
    onChange={(e) =>
      setForm({ ...form, dropLocation: e.target.value })
    }
  />

  <button
    style={styles.mapBtn}
    onClick={() => {
      setSelecting("drop");
      setShowMap(true);
    }}
  >
    📍
  </button>
</div>

{/* MAP */}
{showMap && (
  <MapPicker
    pickupCoords={pickupCoords}
    dropCoords={dropCoords}
    setCoords={async (coords) => {

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`
        );
        const data = await res.json();
        const address = data.display_name || "Selected Location";

        // ✅ PICKUP
        if (selecting === "pickup") {
          setPickupCoords(coords);

          setForm((prev) => ({
            ...prev,
            pickupLocation: address
          }));
        }

        // ✅ DROP
        if (selecting === "drop") {
          setDropCoords(coords);

          setForm((prev) => ({
            ...prev,
            dropLocation: address
          }));
        }

        // ✅ AUTO CLOSE MAP
        setShowMap(false);

      } catch (err) {
        alert("Location fetch failed ❌");
      }
    }}
  />
)}

    {/* Date */}
    <div style={styles.inputWrapper}>
      <DatePicker
        selected={pickupDate}
        onChange={(date) => setPickupDate(date)}
        minDate={new Date()}
        placeholderText="Select Pickup Date"
        className="date-input"
      />
    </div>

    {/* Days */}
    <select
      style={styles.input}
      value={form.days}
      onChange={(e) =>
        setForm({ ...form, days: Number(e.target.value) })
      }
    >
      <option value={1}>1 Day</option>
      <option value={2}>2 Days</option>
      <option value={3}>3 Days</option>
      <option value={5}>5 Days</option>
    </select>

    {/* Fare */}
    <div style={styles.fareBox}>
      Estimated Fare: ₹{calculateFare()}
    </div>

    {/* Distance */}
    {distance > 0 && (
      <div style={{ marginTop: 10 }}>
        Distance: {distance} KM 🚗
      </div>
    )}

    {/* Book Button */}
    <button style={styles.button} onClick={handleBooking}>
      Book Ride
    </button>

    {/* Success */}
    {success && (
      <div style={styles.success}>
        ✅ Booking Successful <br />
        ID: {success.id}
      </div>
    )}

  </div>
);
}

const styles = {

  container: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    padding: 20,
    borderRadius: 12,
    color: "white",
    width: "300px",   // 👈 smaller
    margin: "auto"
  },

  input: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px"
  },

  vehicleRow: {
    display: "flex",
    gap: "8px",
    marginTop: "10px"
  },

  fareBox: {
    marginTop: 10,
    padding: 10,
    background: "#22c55e",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: "14px"
  },

  button: {
    marginTop: 12,
    padding: 10,
    width: "100%",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "14px"
  },

  success: {
    marginTop: 10,
    color: "#4ade80",
    fontSize: "14px"
  },

  locationRow: {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginTop: "8px"
},

locationInput: {
  flex: 1,
  padding: "8px",
  borderRadius: "6px",
  border: "none",
  fontSize: "14px"
},

mapBtn: {
  padding: "8px 10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white"
}

};

export default BookingForm;