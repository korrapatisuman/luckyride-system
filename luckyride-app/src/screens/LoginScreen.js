import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import API from "../services/api";

export default function LoginScreen({ navigation }) {

  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const isEmail = input.includes("@");

  // ✅ SEND OTP
  const sendOtp = async () => {

    console.log("INPUT:", input);

    if (!input || input.trim() === "") {
      alert("Enter phone or email");
      return;
    }

    if (!isEmail && input.length !== 10) {
      alert("Enter valid 10-digit phone");
      return;
    }

    setLoading(true);

    try {

      const payload = isEmail
        ? { email: input.trim() }
        : { phone: input.trim() };

      console.log("SENDING:", payload);

      const res = await API.post("/auth/send-otp", payload);

      console.log("OTP SENT:", res.data);

      setStep(2);

    } catch (err) {

      console.log("SEND OTP ERROR FULL:", err);
      console.log("SEND OTP ERROR:", err?.response?.data);

      alert("Failed to send OTP");

    } finally {
      setLoading(false);
    }
  };


     // ✅ VERIFY OTP (FINAL FIXED VERSION)
const verifyOtp = async () => {

  console.log("VERIFY INPUT:", input, otp);

  if (!otp || otp.length !== 6) {
    alert("Enter valid 6-digit OTP");
    return;
  }

  setLoading(true);

  try {
    const payload = isEmail
      ? { email: input.trim(), otp: otp.trim() }
      : { phone: input.trim(), otp: otp.trim() };

    console.log("VERIFY PAYLOAD:", payload);

    const res = await API.post("/auth/verify-otp", payload);

    console.log("VERIFY RESPONSE FULL:", JSON.stringify(res.data, null, 2));

    // ✅ SAFE EXTRACTION
    const success = res?.data?.success;
    const token = res?.data?.data?.token;

    console.log("TOKEN DEBUG:", token);

    if (!success) {
      alert(res?.data?.message || "OTP verification failed");
      return;
    }

    if (!token) {
      alert("Login failed: Token missing from response");
      return;
    }

    // ✅ SAVE TOKEN (GLOBAL)
    global.userToken = token;

    // ✅ SAVE TOKEN (PERSIST)
    await AsyncStorage.setItem("token", token);

    // ✅ SET HEADER (IMMEDIATE USE)
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log("✅ TOKEN SAVED:", token);

    alert("Login Successful ✅");

    navigation.replace("Main");

  } catch (err) {

    console.log("VERIFY OTP ERROR FULL:", err);

    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong";

    alert(msg);

  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>

      <Text style={styles.logo}>🚕 LuckyRide</Text>

      {step === 1 && (
        <>
          <Text style={styles.title}>Enter Phone or Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Phone or Email"
            value={input}
            onChangeText={setInput}
            keyboardType="default"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={sendOtp}>
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Enter OTP</Text>

          <Text style={styles.subtitle}>
            OTP sent to {input}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendOtp}>
            <Text style={styles.resend}>Resend OTP</Text>
          </TouchableOpacity>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600"
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20
  },

  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  resend: {
    textAlign: "center",
    marginTop: 15,
    color: "#007bff"
  }

});