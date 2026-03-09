import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import API from "../services/api";

export default function LoginScreen({ navigation }) {

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    try {

      setLoading(true);

      // call backend
      await API.post("/auth/send-otp", {
        phone: phone
      });

      setLoading(false);

      alert("OTP sent successfully");

      navigation.replace("Home");

    } catch (error) {

      setLoading(false);
      console.log(error);

      alert("Login failed");

    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>LuckyRide Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Send OTP" onPress={handleLogin} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },

});