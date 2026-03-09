import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={styles.header}>

      <h2 style={styles.logo}>LuckyRide</h2>

      <div style={styles.menu}>

        <Link style={styles.link} to="/">Home</Link>

        <Link style={styles.link} to="/services">Services</Link>

        <Link style={styles.link} to="/about">About</Link>

        <Link style={styles.link} to="/contact">Contact</Link>

        <Link style={styles.login} to="/login">Login</Link>

      </div>

    </div>
  );
}

const styles = {

  header: {
    height: "70px",
    background: "#1e293b",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    color: "white"
  },

  logo: {
    fontWeight: "bold"
  },

  menu: {
    display: "flex",
    gap: "25px",
    alignItems: "center"
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px"
  },

  login: {
    textDecoration: "none",
    background: "#2563eb",
    padding: "8px 15px",
    borderRadius: "5px",
    color: "white"
  }

};

export default Header;