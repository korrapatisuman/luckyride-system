import React, { useEffect, useState } from "react";
import API from "../services/api"; // ✅ IMPORTANT

function AdminMarketplace() {

  const [vehicles, setVehicles] = useState([]);

  // ✅ FETCH DATA
  const fetchVehicles = async () => {
    try {
      const res = await API.get("/marketplace");
      setVehicles(res.data || []);
    } catch (err) {
      console.error(err);
      setVehicles([]); // prevent crash
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/marketplace/${id}/status?status=${status}`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  // ✅ DELETE
  const deleteVehicle = async (id) => {
    try {
      await API.delete(`/marketplace/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Error deleting vehicle");
    }
  };

  return (
  <div style={styles.container}>

    <h2>Marketplace Vehicles 🚗</h2>

    {vehicles.length === 0 ? (
      <p>No vehicles found</p>
    ) : (
      vehicles.map((v) => (
        <div key={v.id} style={styles.card}>

          {/* 🔥 MAIN IMAGE */}
          <img
            src={
              v.images && v.images.length > 0
                ? v.images[0]
                : "https://via.placeholder.com/250"
            }
            style={styles.mainImage}
          />

          {/* 🔥 IMAGE PREVIEW */}
          <div style={styles.imageRow}>
            {v.images?.map((img, i) => (
              <img key={i} src={img} style={styles.thumb} />
            ))}
          </div>

          {/* BASIC INFO */}
          <h3>
            {v.brand} {v.model} ({v.year})
          </h3>

          <p><b>Fuel:</b> {v.fuelType}</p>
          <p><b>Color:</b> {v.color || "N/A"}</p>

          {/* PRICE */}
          <p><b>Market Value:</b> ₹ {v.marketValue}</p>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Final Price: ₹ {v.finalPrice || v.price}
          </p>

          {/* LOCATION + CONTACT */}
          <p>📍 {v.location}</p>
          <p>📞 {v.phone}</p>

          {/* DOCUMENT DETAILS */}
          <div style={styles.section}>
            <p><b>Insurance:</b> {v.insuranceValidTill}</p>
            <p><b>Pollution:</b> {v.pollutionValidTill}</p>
            <p><b>FC:</b> {v.fcValidTill}</p>
            <p><b>Permit:</b> {v.permitValidTill || "N/A"}</p>
          </div>

          {/* DESCRIPTION */}
          <p style={styles.desc}>
            {v.description}
          </p>

          {/* STATUS */}
          <p>Status: <b>{v.status}</b></p>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>

            <button
              style={styles.approve}
              onClick={() => updateStatus(v.id, "APPROVED")}
            >
              ✅ Approve
            </button>

            <button
              style={styles.reject}
              onClick={() => updateStatus(v.id, "REJECTED")}
            >
              ❌ Reject
            </button>

            <button
              style={styles.delete}
              onClick={() => deleteVehicle(v.id)}
            >
              🗑 Delete
            </button>

          </div>

        </div>
      ))
    )}

  </div>
);

}

const styles = {
  container: {
    padding: "20px",
    height: "600px",        // full screen height
    overflowY: "auto",     // ✅ enable vertical scroll
    background: "#f3f4f6"
  },
 card: {
  background: "#fff",
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  margin: "auto"
},
  approve: {
    background: "green",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 5,
    cursor: "pointer"
  },
  reject: {
    background: "orange",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 5,
    cursor: "pointer"
  },
  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 5,
    cursor: "pointer"
  },
  mainImage: {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
},

imageRow: {
  display: "flex",
  gap: "8px",
  overflowX: "auto",   // ✅ horizontal scroll
  paddingBottom: "5px"
},

thumb: {
  width: "50px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "6px"
},

section: {
  background: "#f9fafb",
  padding: "10px",
  borderRadius: "6px",
  marginTop: "10px"
},
thead: {
  position: "sticky",
  top: 0,
  background: "#0f172a",
  color: "#fff",
  zIndex: 1
},

desc: {
  fontSize: "14px",
  color: "#555",
  marginTop: "10px"
}
};

export default AdminMarketplace;