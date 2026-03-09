import React from "react";

function Header() {
  return (
    <div style={styles.header}>

      <h3>LuckyRide Admin Panel</h3>

      <div>
        Welcome Admin
      </div>

    </div>
  );
}

const styles = {

  header: {
    height: "60px",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  }

};

export default Header;