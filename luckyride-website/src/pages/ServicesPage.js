import React from "react";

function ServicesPage() {
  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Our Services 🚗</h1>
        <p style={styles.subtitle}>
          Ride • Rent • Buy • Sell — All in one platform
        </p>
      </div>

      {/* RIDE SERVICES */}
      <h2 style={styles.sectionTitle}>Ride Services</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          🚕
          <h3>Auto Service</h3>
          <p>Quick and affordable rides for daily city travel.</p>
        </div>

        <div style={styles.card}>
          🚗
          <h3>Car Service</h3>
          <p>Comfortable 4+1 cars for personal & business trips.</p>
        </div>

        <div style={styles.card}>
          🚐
          <h3>Traveller</h3>
          <p>12/24 seater vehicles for group travel & tours.</p>
        </div>
      </div>

      {/* RENTAL SERVICES */}
      <h2 style={styles.sectionTitle}>Rental Services</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          📅
          <h3>Daily Rentals</h3>
          <p>Flexible rental plans starting from 1 day.</p>
        </div>

        <div style={styles.card}>
          🧳
          <h3>Outstation Trips</h3>
          <p>Best vehicles for long-distance journeys.</p>
        </div>
      </div>

      {/* BUY / SELL */}
      <h2 style={styles.sectionTitle}>Buy & Sell Vehicles</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          🛒
          <h3>Buy Vehicles</h3>
          <p>
            Explore verified vehicles at best market prices with trusted sellers.
          </p>
        </div>

        <div style={styles.card}>
          💼
          <h3>Sell Your Vehicle</h3>
          <p>
            List your vehicle and connect with buyers easily through LuckyRide.
          </p>
        </div>
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

  header: {
    textAlign: "center",
    marginBottom: "40px"
  },

  title: {
    fontSize: "34px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#64748b"
  },

  sectionTitle: {
    margin: "30px 0 20px",
    textAlign: "center"
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    width: "240px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "0.3s"
  }

};

export default ServicesPage;