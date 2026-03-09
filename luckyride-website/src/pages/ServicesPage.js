import React from "react";

function ServicesPage() {
  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Our Services</h1>

      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>Auto Service</h3>
          <p>Quick and affordable auto rides for short city travel.</p>
        </div>

        <div style={styles.card}>
          <h3>Car Service</h3>
          <p>Comfortable 4+1 seater cars for daily and business trips.</p>
        </div>

        <div style={styles.card}>
          <h3>Traveller Service</h3>
          <p>12 and 24 seater travellers for group travel and tours.</p>
        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "60px 20px",
    textAlign: "center"
  },

  title: {
    marginBottom: "40px"
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    width: "250px",
    padding: "25px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  }

};

export default ServicesPage;