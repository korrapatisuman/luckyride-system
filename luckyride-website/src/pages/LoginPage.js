import React, { useState } from "react";

function LoginPage() {

  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    alert("OTP will be sent to " + phone);
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Login to LuckyRide</h2>

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Send OTP
        </button>

      </div>

    </div>
  );

}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default LoginPage;