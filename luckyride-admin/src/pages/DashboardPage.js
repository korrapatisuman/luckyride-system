import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";

function DashboardPage() {

  const [data, setData] = useState({
    totalBookings: 0,
    totalVehicles: 0,
    totalDrivers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>Dashboard</h1>

      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>Total Bookings</h3>
          <h2>{data.totalBookings}</h2>
        </div>

        <div style={styles.card}>
          <h3>Total Vehicles</h3>
          <h2>{data.totalVehicles}</h2>
        </div>

        <div style={styles.card}>
          <h3>Total Drivers</h3>
          <h2>{data.totalDrivers}</h2>
        </div>

        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <h2>₹ {data.totalRevenue}</h2>
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "center"
  }
};

export default DashboardPage;