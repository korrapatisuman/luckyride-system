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

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [loading, setLoading] = useState(false);

  // SEND OTP
  const sendOtp = async () => {
    if (phone.length !== 10) {
      alert("Enter valid 10-digit number");
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/send-otp", { phone });
      setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
const verifyOtp = async () => {
  if (otp.length !== 4) {
    alert("Enter 4-digit OTP");
    return;
  }

  setLoading(true);

  try {
    const res = await API.post("/auth/verify-otp", { phone, otp });

    // ✅ SAVE USER (IMPORTANT)
    global.user = {
      phone: phone
    };

    navigation.replace("Main");

  } catch (err) {
    alert("Invalid OTP");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>🚕 LuckyRide</Text>

      {step === 1 && (
        <>
          <Text style={styles.title}>Enter Mobile Number</Text>

          <TextInput
            style={styles.input}
            placeholder="10-digit mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
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
            OTP sent to {phone}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter 4-digit OTP"
            keyboardType="number-pad"
            maxLength={4}
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