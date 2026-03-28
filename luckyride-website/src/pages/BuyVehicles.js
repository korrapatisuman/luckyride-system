import React, { useEffect, useState } from "react";
import { getMarketplaceVehicles } from "../services/vehicleService";

function BuyVehicles() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await getMarketplaceVehicles(); // ✅ correct API
      setVehicles(res.data || []); // ✅ safety
    } catch (err) {
      console.error("Error:", err);
      setVehicles([]); // ✅ fallback
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Buy Vehicles 🚗</h1>

      <div style={styles.grid}>

        {vehicles.length === 0 ? (
          <p>No vehicles available</p>
        ) : (
          vehicles.map((v) => (
            <div key={v.id} style={styles.card}>

              {/* MAIN IMAGE */}
              <img
                src={
                  v.images && v.images.length > 0
                    ? v.images[0]
                    : "https://via.placeholder.com/200"
                }
                alt={v.title || "vehicle"}
                style={styles.image}
              />

              {/* SMALL IMAGES */}
              <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                {(v.images || []).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    width="40"
                    height="40"
                    style={{ borderRadius: 4 }}
                  />
                ))}
              </div>

              <h3>{v.title || "Vehicle"}</h3>

              <p style={styles.price}>₹{v.price || 0}</p>

              <p>📍 {v.location || "Unknown"}</p>

              <button
                style={styles.button}
                onClick={() => window.open(`tel:${v.phone || ""}`)}
              >
                📞 Call Seller
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "40px 20px",
    maxWidth: "1100px",
    margin: "auto",
    fontFamily: "sans-serif"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px"
  },

  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  card: {
    width: "250px",
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    marginBottom: "10px",
    borderRadius: "8px"
  },

  price: {
    color: "#16a34a",
    fontWeight: "bold",
    fontSize: "18px"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default BuyVehicles;