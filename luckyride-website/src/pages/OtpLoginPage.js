import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function OtpLoginPage() {
  
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

  // 📩 Send OTP
  const handleSendOtp = async () => {
  if (!login) {
    alert("Enter email or phone first");
    return;
  }

  let phone = "";
  let email = "";

  if (login.includes("@")) {
    email = login;
  } else {
    phone = login;
  }

  try {
    setLoading(true);

    await API.post("/auth/send-otp", {
      phone,
      email
    });

    alert("OTP Sent ✅");
    setStep(2);

  } catch (err) {
    console.error(err);
    alert("Failed ❌");
  } finally {
    setLoading(false);
  }
};

   // 🔐 Verify OTP
   const handleVerifyOtp = async () => {

  if (!otp) {
    alert("Enter OTP");
    return;
  }

  let phone = "";
  let email = "";

  if (login.includes("@")) {
    email = login;
  } else {
    phone = login;
  }

  try {
    setLoading(true);

    const res = await API.post("/auth/verify-otp", {
      phone,
      email,
      otp
    });

    // ✅ Save token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("login", login);

    // 🔥 trigger navbar update
    window.dispatchEvent(new Event("storage"));

    alert("Login Successful 🎉");

    navigate("/bookings");

  } catch (err) {
    console.error(err);
    alert("Invalid OTP ❌");

  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      <h2>Login / Signup</h2>

      {step === 1 && (
        <>
       <input
          placeholder="Enter Email or Phone"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />

          <button onClick={handleSendOtp} style={styles.button}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleVerifyOtp} style={styles.button}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: 320,
    margin: "80px auto",
    textAlign: "center",
    padding: 20,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 15
  },
  button: {
    width: "100%",
    padding: 12,
    marginTop: 15,
    background: "#16a34a",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default OtpLoginPage;