import React, { useEffect, useState } from "react";
import { getUserBookings } from "../services/bookingService";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("login");

    if (!login) {
      alert("Please login");
      navigate("/login");
      return;
    }

    fetchBookings(login);
  }, []);

  const fetchBookings = async (login) => {
    try {
      setLoading(true);
      const res = await getUserBookings(login);
      console.log("Bookings 👉", res.data); // DEBUG
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ PAYMENT FIX (correct API)
  const handlePayment = async (id, method) => {
  try {
    await API.put(`/bookings/${id}/pay?method=${method}`);

    alert(`Payment via ${method} Successful ✅`);

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, paymentDone: true, status: "CONFIRMED" } : b
      )
    );

  } catch (err) {
    console.error("Payment Error 👉", err.response?.data || err.message);
    alert("Payment Failed ❌");
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED":
        return "#facc15";
      case "ASSIGNED":
        return "#3b82f6";
      case "ONGOING":
        return "#22c55e";
      case "COMPLETED":
        return "#16a34a";
      case "CANCELLED":
        return "#ef4444";
      case "CONFIRMED":
        return "#10b981";
      default:
        return "#9eefd8";
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Bookings</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          🚫 No bookings found
        </p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} style={styles.card}>
            <div style={styles.row}>
              <strong>Booking ID:</strong> #{b.id}
            </div>

            <div style={styles.row}>📍 {b.pickupLocation}</div>
            <div style={styles.row}>➡️ {b.dropLocation}</div>
            <div style={styles.row}>🚗 {b.vehicleType}</div>

            <div style={styles.row}>
              📅{" "}
              {b.pickupDate
                ? new Date(b.pickupDate).toLocaleDateString()
                : "N/A"}
            </div>

            <div style={styles.row}>💰 ₹{b.totalPrice}</div>

            {/* STATUS */}
            <div
              style={{
                ...styles.status,
                background: getStatusColor(b.status),
              }}
            >
              {b.status === "PAID" && (
  <div style={{ color: "green", fontWeight: "bold" }}>
    ✅ Payment Completed via {b.paymentMethod}
  </div>
)}
            </div>

            {/* DRIVER */}
            {b.driverName && (
              <div style={styles.driverBox}>
                👨‍✈️ {b.driverName} <br />
                📞 {b.driverPhone}
              </div>
            )}

            {/* ✅ PAYMENT INSIDE CARD */}
            {!b.paymentDone && (
              <div style={styles.paymentBox}>
                <p>Pay Advance ₹500</p>

                <button
                  onClick={() => handlePayment(b.id, "GPay")}
                  style={styles.gpay}
                >
                  GPay
                </button>

                <button
                  onClick={() => handlePayment(b.id, "PhonePe")}
                  style={styles.phonepe}
                >
                  PhonePe
                </button>

                <button
                  onClick={() => handlePayment(b.id, "Cash")}
                  style={styles.cash}
                >
                  Cash
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    margin: "auto",
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  title: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a"
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 18,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s"
  },

  row: {
    marginBottom: 6,
    fontSize: 14,
    color: "#1e293b"
  },

  price: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#16a34a"
  },

  status: {
    marginTop: 10,
    padding: "6px",
    color: "white",
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13
  },

  paymentSuccess: {
    marginTop: 12,
    padding: 10,
    background: "#dcfce7",
    color: "#166534",
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold"
  },

  driverBox: {
    marginTop: 12,
    padding: 10,
    background: "#f1f5f9",
    borderRadius: 8
  },

  paymentBox: {
    marginTop: 15,
    textAlign: "center",
    padding: 10,
    background: "#f8fafc",
    borderRadius: 10
  },

  gpay: {
    background: "#4285F4",
    color: "white",
    border: "none",
    padding: "8px 14px",
    margin: 5,
    borderRadius: 6,
    cursor: "pointer"
  },

  phonepe: {
    background: "#5f259f",
    color: "white",
    border: "none",
    padding: "8px 14px",
    margin: 5,
    borderRadius: 6,
    cursor: "pointer"
  },

  cash: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "8px 14px",
    margin: 5,
    borderRadius: 6,
    cursor: "pointer"
  }
};

export default MyBookings;