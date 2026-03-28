import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 LuckyRide. All Rights Reserved.</p>
      <p style={styles.sub}>Vehicle Rental | Local & Outstation</p>
    </footer>
  );
}

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    height: "80px",
    background: "#0f172a",
    color: "#cbd5f5",
    display: "flex",
    flexDirection: "column",   // 🔥 vertical
   alignItems: "center",     // center horizontally
   justifyContent: "center"

    
  },

  sub: {
  fontSize: "12px",
  color: "#94a3b8",
  marginTop: "5px",
  letterSpacing: "0.5px"
}
};

export default Footer;