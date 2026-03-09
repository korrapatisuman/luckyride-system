import React from "react";

function ContactPage() {
  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Contact Us</h1>

      <p style={styles.text}>
        Have questions or need a ride? Get in touch with LuckyRide.
      </p>

      <div style={styles.info}>
        <p><strong>Phone:</strong> +91 90000 00000</p>
        <p><strong>Email:</strong> support@luckyride.com</p>
        <p><strong>Location:</strong> Bangalore, India</p>
      </div>

      <div style={styles.form}>

        <input type="text" placeholder="Your Name" style={styles.input} />

        <input type="email" placeholder="Your Email" style={styles.input} />

        <textarea placeholder="Your Message" style={styles.textarea}></textarea>

        <button style={styles.button}>Send Message</button>

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "60px 20px",
    textAlign: "center",
    maxWidth: "700px",
    margin: "auto"
  },

  title: {
    marginBottom: "20px"
  },

  text: {
    marginBottom: "30px",
    fontSize: "16px"
  },

  info: {
    marginBottom: "30px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  textarea: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    height: "100px"
  },

  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default ContactPage;