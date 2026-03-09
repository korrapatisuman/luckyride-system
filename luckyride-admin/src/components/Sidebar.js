import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>

      <h2 style={styles.logo}>LuckyRide</h2>

      <ul style={styles.menu}>

        <li>
          <Link style={styles.link} to="/">Dashboard</Link>
        </li>

        <li>
          <Link style={styles.link} to="/users">Users</Link>
        </li>

        <li>
          <Link style={styles.link} to="/drivers">Drivers</Link>
        </li>

        <li>
          <Link style={styles.link} to="/vehicles">Vehicles</Link>
        </li>

        <li>
          <Link style={styles.link} to="/bookings">Bookings</Link>
        </li>

        <li>
          <Link style={styles.link} to="/login">Logout</Link>
        </li>

      </ul>

    </div>
  );
}

const styles = {

  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    padding: "20px"
  },

  logo: {
    marginBottom: "30px"
  },

  menu: {
    listStyle: "none",
    padding: 0
  },

  link: {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px 0"
  }

};

export default Sidebar;