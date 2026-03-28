import React from "react";

function AboutPage() {
  return (
    <div style={styles.container}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>About LuckyRide 🚗</h1>
        <p style={styles.subtitle}>
          Safe • Reliable • Affordable rides at your fingertips
        </p>
      </div>

      {/* ABOUT TEXT */}
      <div style={styles.section}>
        <p style={styles.text}>
          LuckyRide is a modern vehicle rental and ride booking platform
          designed to make transportation easy, safe, and affordable for everyone.
        </p>

        <p style={styles.text}>
          Whether it's a quick city ride, airport transfer, or long-distance
          journey, we provide the right vehicle at the right price.
        </p>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          🚗
          <h3>Multiple Vehicles</h3>
          <p>Auto, Car, Traveller options for all needs</p>
        </div>

        <div style={styles.card}>
          👨‍✈️
          <h3>Verified Drivers</h3>
          <p>Professional and trusted drivers</p>
        </div>

        <div style={styles.card}>
          💰
          <h3>Affordable Pricing</h3>
          <p>Transparent pricing with no hidden charges</p>
        </div>
      </div>

      {/* MISSION */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Our Mission</h2>
        <p style={styles.text}>
          To provide reliable, safe, and seamless transportation through
          smart technology and customer-first service.
        </p>
      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "sans-serif"
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px"
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#64748b",
    fontSize: "18px"
  },

  section: {
    textAlign: "center",
    marginBottom: "40px"
  },

  heading: {
    marginBottom: "10px"
  },

  text: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "#334155"
  },

  features: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    width: "220px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontSize: "18px"
  }

};

export default AboutPage;