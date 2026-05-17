import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminMarketplace() {

  const [vehicles, setVehicles] = useState([]);

  // ✅ FETCH MARKETPLACE VEHICLES
  const fetchVehicles = async () => {
    try {

      // ✅ FIXED URL
      const res = await API.get("/market/admin/vehicles");

      console.log("Marketplace:", res.data);

      setVehicles(res.data.data || res.data || []);

    } catch (err) {
      console.error(err);
      setVehicles([]);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ APPROVE / REJECT
  const updateStatus = async (id, status) => {
    try {

      if (status === "APPROVED") {

        await API.put(`/market/admin/${id}/approve`);

      } else {

        await API.put(`/market/admin/${id}/reject`);
      }

      fetchVehicles();

    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  // ✅ DELETE
  const deleteVehicle = async (id) => {
    try {

      await API.delete(`/market/admin/${id}`);

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

            {/* MAIN IMAGE */}
            <img
              src={
                v.images && v.images.length > 0
                  ? v.images[0]
                  : "https://via.placeholder.com/250"
              }
              alt="vehicle"
              style={styles.mainImage}
            />

            {/* IMAGE ROW */}
            <div style={styles.imageRow}>
              {v.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  style={styles.thumb}
                />
              ))}
            </div>

            {/* INFO */}
            <h3>
              {v.brand} {v.model} ({v.year})
            </h3>

            <p><b>Fuel:</b> {v.fuelType}</p>

            <p><b>Color:</b> {v.color || "N/A"}</p>

            <p><b>Market Value:</b> ₹ {v.marketValue}</p>

            <p style={{ color: "green", fontWeight: "bold" }}>
              Final Price: ₹ {v.finalPrice || v.price}
            </p>

            <p>📍 {v.location}</p>

            <p>📞 {v.phone}</p>

            {/* DOCUMENTS */}
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

            <p>
              Status: <b>{v.status}</b>
            </p>

            {/* BUTTONS */}
            <div style={styles.buttonRow}>

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

// ✅ STYLES
const styles = {

  container: {
    padding: 20,
    background: "#f5f5f5",
    minHeight: "100vh"
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  mainImage: {
    width: "100%",
    maxWidth: 300,
    height: 200,
    objectFit: "cover",
    borderRadius: 10
  },

  imageRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap"
  },

  thumb: {
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: 6
  },

  section: {
    marginTop: 10,
    padding: 10,
    background: "#fafafa",
    borderRadius: 6
  },

  desc: {
    marginTop: 10,
    color: "#444"
  },

  buttonRow: {
    display: "flex",
    gap: 10,
    marginTop: 15,
    flexWrap: "wrap"
  },

  approve: {
    padding: "10px 15px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  reject: {
    padding: "10px 15px",
    background: "orange",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  delete: {
    padding: "10px 15px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};

export default AdminMarketplace;