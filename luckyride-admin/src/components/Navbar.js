import React from "react";

function Navbar() {
  return (
    <div style={styles.navbar}>

      <div style={styles.left}>
        <h3>LuckyRide Admin</h3>
      </div>

      <div style={styles.right}>
        <span style={styles.admin}>Admin</span>
        <button style={styles.logout}>Logout</button>
      </div>

    </div>
  );
}

const styles = {

  navbar: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },

  left: {
    fontWeight: "bold"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  admin: {
    fontWeight: "500"
  },

  logout: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer"
  }

};

export default Navbar;