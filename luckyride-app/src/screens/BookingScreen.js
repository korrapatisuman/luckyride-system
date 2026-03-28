import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import API from "../services/api";

export default function BookingScreen({ route, navigation }) {

  const {
    vehicle,
    tripType,
    pickup,
    drop,
    pickupDate,
    days,
    totalPrice,
    advance,
    distance
  } = route.params;

  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {

    if (loading) return;

    // ❗ SAFETY CHECK (VERY IMPORTANT)
    if (!global.user?.phone) {
      Alert.alert("Error", "User not logged in properly");
      return;
    }

    setLoading(true);

    try {

      const bookingData = {
        userPhone: global.user?.phone,

        vehicleId: vehicle?.id,   // ✅ MUST ADD (backend needs this)

        vehicleType: vehicle?.vehicleType,
        tripType: tripType,
        pickupDate: pickupDate,
        days: Number(days),
        distance: distance || 0,
        totalPrice: totalPrice,
        advancePaid: advance,
        status: "BOOKED",
        pickupLocation: pickup,
        dropLocation: drop || null
      };

      console.log("📤 Sending booking:", bookingData);

      const res = await API.post("/bookings", bookingData);

      console.log("✅ Booking Success:", res.data);

      Alert.alert("Success", "Booking Confirmed 🚗");

      navigation.replace("BookingSuccess", {
        booking: res.data
      });

    } catch (error) {

      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message;

      console.log("❌ Booking error:", msg);

      Alert.alert("Booking Failed", msg || "Something went wrong");

    } finally {
      setLoading(false);
    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Confirm Booking</Text>

      <View style={styles.card}>

        <Text style={styles.vehicle}>
          🚗 {vehicle?.vehicleName || "Vehicle"}
        </Text>

        <Text style={styles.info}>Trip: {tripType}</Text>
        <Text style={styles.info}>Pickup: {pickup}</Text>

        {drop && (
          <Text style={styles.info}>Drop: {drop}</Text>
        )}

        <Text style={styles.info}>Date: {pickupDate}</Text>
        <Text style={styles.info}>Days: {days}</Text>

        {distance > 0 && (
          <Text style={styles.info}>
            Distance: {distance.toFixed(2)} km
          </Text>
        )}

        <Text style={styles.price}>₹{totalPrice}</Text>

        <Text style={styles.advance}>
          Advance: ₹{advance}
        </Text>

      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleBooking}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Booking..." : "Confirm Booking"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    marginBottom: 30,
    elevation: 4
  },

  vehicle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  info: {
    fontSize: 15,
    marginBottom: 6,
    color: "#555"
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2e7d32"
  },

  advance: {
    fontSize: 16,
    marginTop: 5,
    color: "#777"
  },

  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonDisabled: {
    backgroundColor: "#777"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});