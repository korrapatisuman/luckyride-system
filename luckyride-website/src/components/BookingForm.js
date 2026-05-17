import React, { useState } from "react";
import { useEffect } from "react";
import MapPicker from "./MapPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getVehicles } from "../services/vehicleService";
import { createBooking } from "../services/bookingService";
import VehicleCard from "./VehicleCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function BookingForm() {

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // ✅ MUST BE HERE

  const [form, setForm] = useState({
    tripType: "LOCAL",
    vehicleType: "Auto",
    pickupLocation: "",
    dropLocation: "",
    days: 1
  });


 
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
    const d = distance || 10;
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
      const roundTrip = d * 2;
      const minKm = days * 300;
      totalKm = Math.max(roundTrip, minKm);
    }

    return totalKm * rate;
  };

    useEffect(() => {
    fetchVehicles();
  }, []);
    
    const fetchVehicles = async () => {

    try {

      const res = await getVehicles();

      console.log("API RESPONSE 👉", res.data);

      // ✅ IMPORTANT
      setVehicles(res.data.data || []);

    } catch (err) {

      console.error("FETCH ERROR 👉", err);

      setVehicles([]);
    }
  };

   const handleBooking = async () => {

  if (!form.pickupLocation || !form.dropLocation) {
    alert("Please fill all fields");
    return;
  }

  try {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again 🔐");
      navigate("/login");
      return;
    }

    // ✅ FIX DATE FORMAT
    const formattedDate = pickupDate
      ? new Date(pickupDate).toISOString().split("T")[0]
      : null;

    const payload = {

      // ❌ REMOVE THIS
      // userId: 1,

      userPhone: form.userPhone,

      vehicleId: form.vehicleId,

      vehicleType: form.vehicleType,

      tripType: form.tripType,

      pickupLocation: form.pickupLocation,

      dropLocation: form.dropLocation,

      days: Number(form.days),

      distance: Number(distance),

      totalPrice: Number(calculateFare()),

      pickupDate: new Date().toISOString().slice(0, 19).replace("T", " ")
    };

    console.log("BOOKING PAYLOAD 👉", payload);

    await createBooking(payload);

    alert("Booking Created 🚖");

    navigate("/bookings");

  } catch (err) {

    console.error("BOOKING ERROR 👉", err);

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
     <select
       style={styles.input}
       value={selectedVehicle?.id || ""}
      onChange={(e) => {

  const vehicle = vehicles.find(
    (v) => v.id === Number(e.target.value)
  );

  setSelectedVehicle(vehicle);

  setForm({
    ...form,
    vehicleId: vehicle?.id,
    vehicleType: vehicle?.vehicleType
  });
}}
    >

      <option value="">Select Vehicle</option>

      {Array.isArray(vehicles) &&
        vehicles.map((v) => (
          <option key={v.id} value={v.id}>
            {v.vehicleName} ({v.vehicleType})
          </option>
      ))}

    </select>
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
  style={styles.input}
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
    maxWidth: "500px",
    margin: "30px auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  input: {
    width: "100%",
    height: "48px",
    padding: "0 14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff"
  },

  vehicleRow: {
    width: "100%"
  },

  locationRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  locationInput: {
    flex: 1,
    height: "48px",
    padding: "0 14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none"
  },

  mapBtn: {
    width: "48px",
    height: "48px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer"
  },

  fareBox: {
    padding: "14px",
    background: "#eff6ff",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#1d4ed8"
  },

  button: {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },

  success: {
    padding: "14px",
    background: "#dcfce7",
    borderRadius: "10px",
    color: "#166534",
    fontWeight: "600",
    textAlign: "center"
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