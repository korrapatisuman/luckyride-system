import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookingSuccessScreen({ route, navigation }) {

  const booking = route?.params?.booking;

  // ❗ SAFETY (NO CRASH)
  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No booking data found</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("Main")}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isDriverAssigned = booking?.driverName;

  return (

    <View style={styles.container}>

      {/* ✅ SUCCESS ICON */}
      <Text style={styles.successIcon}>🎉</Text>

      <Text style={styles.success}>
        Booking Confirmed
      </Text>

      {/* 🧾 BOOKING CARD */}
      <View style={styles.card}>

        <Text style={styles.bookingId}>
          Booking ID: LR{booking?.id}
        </Text>

        <Text style={styles.info}>
          🚗 {booking?.vehicleType}
        </Text>

        <Text style={styles.info}>
          📍 {booking?.pickupLocation}
        </Text>

        {booking?.dropLocation && (
          <Text style={styles.info}>
            ➡ {booking?.dropLocation}
          </Text>
        )}

        <Text style={styles.status}>
          Status: {booking?.status}
        </Text>

      </View>

      {/* 🚗 DRIVER CARD */}
      <View style={styles.driverCard}>

        <Text style={styles.driverTitle}>
          Driver Details
        </Text>

        <Text style={styles.info}>
          👤 {booking?.driverName || "Assigning..."}
        </Text>

        <Text style={styles.info}>
          📞 {booking?.driverPhone || "Will be shared soon"}
        </Text>

      </View>

      {/* 📢 MESSAGE */}
      <Text style={styles.sub}>
        {isDriverAssigned
          ? "Driver assigned successfully 🚗"
          : "Driver will be assigned shortly 🚗"}
      </Text>

      {/* 🔥 ACTION BUTTON */}
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

  successIcon: {
    fontSize: 50,
    marginBottom: 10
  },

  success: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e7d32"
  },

  bookingId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    width: "100%",
    marginBottom: 15,
    elevation: 4
  },

  driverCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 14,
    width: "100%",
    marginBottom: 15,
    elevation: 3
  },

  driverTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },

  info: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444"
  },

  status: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#1976d2"
  },

  sub: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center"
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  error: {
    fontSize: 18,
    marginBottom: 20
  }

});