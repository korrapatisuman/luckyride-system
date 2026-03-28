import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ACTIVE PAGE CHECK
  const isActive = (path) => location.pathname === path;

  // ✅ LOGIN CHECK
  useEffect(() => {
    const handleStorageChange = () => {
      checkLogin();
    };

    window.addEventListener("storage", handleStorageChange);

    checkLogin();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const checkLogin = () => {
    const login = localStorage.getItem("login");
    setIsLoggedIn(!!login);
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>

      {/* ✅ LOGO SECTION */}
      <div style={styles.logoBox}>
        <h2 style={styles.logo}>🚗 LuckyRide</h2>
        <p style={styles.subLogo}>Rental Services</p>
      </div>

      {/* ✅ MENU */}
      <div style={styles.menu}>

        {navLink("/", "Home")}
        {navLink("/services", "Services")}
        {navLink("/buy", "Buy Vehicles")}
        {navLink("/sell", "Sell Vehicle")}
        {navLink("/contact", "Contact")}
        {navLink("/about", "About")}

        {isLoggedIn && navLink("/bookings", "My Bookings")}

        {isLoggedIn ? (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link style={styles.loginBtn} to="/login">
            Login
          </Link>
        )}
      </div>

    </nav>
  );

  // ✅ REUSABLE NAV LINK
  function navLink(path, label) {
    return (
      <Link
        to={path}
        style={{
          ...styles.link,
          ...(isActive(path) && styles.activeLink)
        }}
        onMouseEnter={(e) => (e.target.style.color = "#22c55e")}
        onMouseLeave={(e) =>
          (e.target.style.color = isActive(path) ? "#22c55e" : "#e2e8f0")
        }
      >
        {label}
      </Link>
    );
  }
}

const styles = {

  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "80px",
    zIndex: 1000,
    background: "linear-gradient(90deg, #0f172a, #1e293b)",
    padding: "12px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    boxSizing: "border-box"
  },

  logoBox: {
    display: "flex",
    flexDirection: "column"
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    color: "white"
  },

  subLogo: {
    fontSize: "14px",
    color: "#facc15",
    padding: "1px 65px",
    margin: 0
  },

  menu: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  link: {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "14px",
    paddingBottom: "4px",
    transition: "0.3s"
  },

  // ✅ ACTIVE PAGE STYLE
  activeLink: {
    color: "#22c55e",
    borderBottom: "2px solid #22c55e"
  },

  loginBtn: {
    background: "#22c55e",
    color: "white",
    padding: "6px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px"
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default Navbar;