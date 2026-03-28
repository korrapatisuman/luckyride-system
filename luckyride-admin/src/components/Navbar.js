import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      
      {/* LEFT */}
      <div style={styles.left}>
        <h2 style={styles.title}>🚗 LuckyRide</h2>
        <span style={styles.subtitle}>Admin Panel</span>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        
        <div style={styles.profile}>
          <div style={styles.avatar}>A</div>
          <span style={styles.admin}>Admin</span>
        </div>

        <button style={styles.logout} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

    </div>
  );
}

const styles = {
  navbar: {
    height: "65px",
    background: "#0f172a",
    color: "#fff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  left: {
    display: "flex",
    flexDirection: "column"
  },

  title: {
    margin: 0,
    fontSize: "18px"
  },

  subtitle: {
    fontSize: "12px",
    color: "#6b7280"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },

  admin: {
    fontWeight: "500"
  },

  logout: {
    padding: "7px 14px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;