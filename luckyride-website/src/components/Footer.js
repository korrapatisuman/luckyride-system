import React from "react";

function Footer() {
  return (
    <footer style={footer}>
      <p>© 2026 LuckyRide. All Rights Reserved.</p>
      <p>Vehicle Rental Service</p>
    </footer>
  );
}

const footer = {
  background: "#0f172a",
  color: "white",
  textAlign: "center",
  padding: "20px",
  marginTop: "40px"
};

export default Footer;