import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookingSuccessScreen({ route, navigation }) {

  const { booking } = route.params || {};

  return (

    <View style={styles.container}>

      <Text style={styles.success}>Booking Confirmed ✅</Text>

      <View style={styles.card}>

        <Text style={styles.info}>
          Booking ID: LR{booking?.id}
        </Text>

        <Text style={styles.info}>
          Vehicle: {booking?.vehicleType}
        </Text>

        <Text style={styles.info}>
          Pickup: {booking?.pickupLocation}
        </Text>

        {booking?.dropLocation && (
          <Text style={styles.info}>
            Drop: {booking?.dropLocation}
          </Text>
        )}

        <Text style={styles.info}>
          Status: {booking?.status}
        </Text>

        {/* 🚗 DRIVER DETAILS (NEW) */}
        <Text style={styles.info}>
          Driver: {booking?.driverName || "Assigning..."}
        </Text>

        <Text style={styles.info}>
          Phone: {booking?.driverPhone || "-"}
        </Text>

      </View>

      <Text style={styles.sub}>
        Driver will be assigned shortly 🚗
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.replace("Main", {
            screen: "MyRides"
          })
        }
      >
        <Text style={styles.buttonText}>
          Go to My Rides
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5"
  },

  success: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green"
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
    elevation: 3
  },

  info: {
    fontSize: 16,
    marginBottom: 8
  },

  sub: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20
  },

  button: {
    marginTop: 10,
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});