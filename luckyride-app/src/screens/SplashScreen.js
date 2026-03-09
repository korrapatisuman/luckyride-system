import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LuckyRide 🚖</Text>
      <Text>Smart Vehicle Rental</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10
  }

});