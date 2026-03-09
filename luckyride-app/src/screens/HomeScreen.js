import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {

  const navigation = useNavigation();

  return (

    <View style={styles.container}>

      <Text style={styles.title}>🚕 LuckyRide</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Vehicles")}
      >
        <Text style={styles.buttonText}>BOOK RIDE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.buttonText}>MY RIDES</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    marginVertical: 10,
    width: 200,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  }
});