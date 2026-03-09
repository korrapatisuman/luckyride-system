import React from "react";

function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h4 style={styles.title}>{title}</h4>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    flex: 1,
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: "200px"
  },

  title: {
    color: "#64748b",
    marginBottom: "10px"
  },

  value: {
    color: "#1e293b",
    fontSize: "28px",
    fontWeight: "bold"
  }
};

export default StatCard;