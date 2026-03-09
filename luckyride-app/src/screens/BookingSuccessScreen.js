import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookingSuccessScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>
        Ride Booked Successfully!
      </Text>

      <Text style={styles.subtitle}>
        Your driver will contact you shortly.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("History")}
      >
        <Text style={styles.buttonText}>View My Rides</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  icon: {
    fontSize: 70,
    marginBottom: 20
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
    textAlign: "center"
  },

  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 15
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },

  homeBtn: {
    padding: 10
  },

  homeText: {
    color: "gray",
    fontSize: 15
  }
});