import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = { email, password };

    const res = await adminLogin(data);

    localStorage.setItem("adminToken", res.data.token);

    alert("Login Successful");
    navigate("/dashboard");

  } catch (err) {
    alert("Login Failed");
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

  return (
   <div style={styles.container}>

  {/* LEFT SIDE */}
  <div style={styles.leftPanel}>
    <h1 style={styles.brand}>LuckyRide</h1>

    <ul style={styles.quoteList}>
      <li>🚗 سفر راحت، تجربه عالی — Ride in comfort, travel in style</li>
      <li>🌍 Every journey begins with a single ride</li>
      <li>🛣️ Your destination, our responsibility</li>
      <li>⏱️ Book today, travel tomorrow</li>
      <li>✨ Safe rides. Smart choices. LuckyRide.</li>
    </ul>
  </div>

  {/* RIGHT SIDE (LOGIN) */}
  <div style={styles.rightPanel}>
    <div style={styles.card}>
      <h2 style={styles.title}>Admin Login</h2>
      <p style={styles.subtitle}>Welcome back</p>

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Admin Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />

        <button type="submit" style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>

</div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e293b, #0f172a)"
  },

  container: {
  display: "flex",
  height: "100vh"
},

leftPanel: {
  width: "50%",
  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  color: "#fff",
  padding: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
},

brand: {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "30px"
},

quoteList: {
  listStyle: "none",
  padding: 0,
  lineHeight: "2",
  fontSize: "16px"
},

rightPanel: {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f9fafb"
},

  card: {
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "12px",
    width: "360px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  title: {
    marginBottom: "5px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827"
  },

  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#6b7280"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "0.3s"
  }

};

export default LoginPage;