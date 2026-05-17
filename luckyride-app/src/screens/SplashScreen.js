import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {

  useEffect(() => {

    const checkAuth = async () => {

  try {

    const token = await AsyncStorage.getItem("token");
    const userData = await AsyncStorage.getItem("user");

    console.log("🔐 TOKEN:", token);
    console.log("👤 USER:", userData);

    if (token && userData) {

      global.user = JSON.parse(userData);

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