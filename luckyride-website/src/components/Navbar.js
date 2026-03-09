import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={navStyle}>
      <h2 style={logo}>LuckyRide</h2>

      <div style={menu}>
        <Link style={link} to="/">Home</Link>
        <Link style={link} to="/about">About</Link>
        <Link style={link} to="/services">Services</Link>
        <Link style={link} to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  background: "#0f172a",
  color: "white"
};

const logo = {
  margin: 0
};

const menu = {
  display: "flex",
  gap: "20px"
};

const link = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px"
};

export default Navbar;