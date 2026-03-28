import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

    const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Drivers", path: "/drivers", icon: "🧑‍✈️" },
    { name: "Vehicles", path: "/vehicles", icon: "🚗" },
    { name: "Bookings", path: "/bookings", icon: "📦" },
    { name: "Marketplace", path: "/marketplace", icon: "🛒" }
  ];

  return (
    <div style={styles.sidebar}>
  <div>
    <h2 style={styles.logo}>🚗 LuckyRide</h2>

    <div style={styles.menu}>
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...styles.link,
            background: isActive ? "#2563eb" : "transparent"
          })}
        >
          <span>{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </div>
  </div>

  {/* ✅ ALWAYS VISIBLE */}
  <button style={styles.logoutBtn} onClick={handleLogout}>
    🚪 Logout
  </button>
</div>
  );
}

const styles = {
    sidebar: {
  width: "220px",
  background: "#0f172a",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden"
},

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "30px"
  },

  menu: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

    link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#fff",
    transition: "0.2s"
  },

  icon: {
    fontSize: "16px"
  },

  logoutBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "20px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    textAlign: "left"
  }
};

export default Sidebar;