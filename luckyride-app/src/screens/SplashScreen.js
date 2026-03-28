import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import API from "../services/api";

export default function SplashScreen({ navigation }) {

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        console.log("🔐 STORED TOKEN:", token);

        if (token) {
          // ✅ Restore token globally
          global.userToken = token;

          // ✅ Attach to API
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          navigation.replace("Main");
        } else {
          navigation.replace("Login");
        }

      } catch (err) {
        console.log("SPLASH ERROR:", err);
        navigation.replace("Login");
      }
    };

    setTimeout(checkAuth, 1500);

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🚕 LuckyRide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold"
  }
});