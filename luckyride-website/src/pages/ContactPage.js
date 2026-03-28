import React from "react";

function ContactPage() {
  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Contact LuckyRide 📞</h1>
        <p style={styles.subtitle}>
          We're here to help you 24/7. Reach out anytime!
        </p>
      </div>

      {/* CONTACT INFO CARDS */}
      <div style={styles.infoGrid}>

        <div style={styles.card}>
          📞
          <h3>Call Us</h3>
          <p>+91 8019941185</p>
          <p>+91 9885462469</p>
        </div>

        <div style={styles.card}>
          ✉️
          <h3>Email</h3>
          <p>luckyride@gmail.com</p>
          <p>luckyride@happyjourney.com</p>
        </div>

        <div style={styles.card}>
          📍
          <h3>Location</h3>
          <p>Bangalore, India</p>
        </div>

      </div>

      {/* FORM */}
      <div style={styles.formContainer}>

        <h2 style={{ marginBottom: "15px" }}>Send Message</h2>

        <input type="text" placeholder="Your Name" style={styles.input} />

        <input type="email" placeholder="Your Email" style={styles.input} />

        <textarea
          placeholder="Your Message"
          style={styles.textarea}
        ></textarea>

        <button style={styles.button}>Send Message</button>

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

  header: {
    textAlign: "center",
    marginBottom: "40px"
  },

  title: {
    fontSize: "34px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#64748b",
    fontSize: "16px"
  },

  infoGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  formContainer: {
    maxWidth: "500px",
    margin: "auto",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    height: "100px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "10px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }

};

export default ContactPage;