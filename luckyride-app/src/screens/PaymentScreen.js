import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentScreen({ route, navigation }) {

  const {
    vehicle,
    tripType,
    pickup,
    drop,
    pickupDate,
    days,
    distance
  } = route.params;

  // ✅ SAFE FALLBACKS (VERY IMPORTANT FOR STAGING)
  const base = vehicle?.pricePerKm || 0;
  const driver = vehicle?.driverCharge || 0;
  const extraKmRate = vehicle?.pricePerKm || 0;

  const totalDays = parseInt(days) || 1;

  // 💰 PRICE CALCULATION
  let totalPrice = (base + driver) * totalDays;

  let extraCost = 0;

  if (distance > 0) {
    extraCost = distance * extraKmRate;
    totalPrice += extraCost;
  }

  const advance = Math.round(totalPrice * 0.1);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>Payment Summary</Text>

      {/* 🚗 TRIP CARD */}
      <View style={styles.card}>

        <Text style={styles.vehicle}>
          {vehicle?.vehicleName || "Vehicle"}
        </Text>

        <Text style={styles.text}>Trip: {tripType}</Text>
        <Text style={styles.text}>Pickup: {pickup}</Text>

        {tripType === "Long Trip" && (
          <Text style={styles.text}>Drop: {drop}</Text>
        )}

        <Text style={styles.text}>Date: {pickupDate}</Text>
        <Text style={styles.text}>Days: {totalDays}</Text>

        {distance > 0 && (
          <Text style={styles.text}>
            Distance: {distance.toFixed(1)} km
          </Text>
        )}

      </View>

      {/* 💸 PRICE BREAKDOWN */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>Price Breakdown</Text>

        <View style={styles.row}>
          <Text>Base Price</Text>
          <Text>₹ {base} × {totalDays}</Text>
        </View>

        <View style={styles.row}>
          <Text>Driver Charge</Text>
          <Text>₹ {driver} × {totalDays}</Text>
        </View>

        {distance > 0 && (
          <View style={styles.row}>
            <Text>Extra KM</Text>
            <Text>₹ {extraKmRate} × {distance.toFixed(0)}</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>₹ {totalPrice}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.advance}>Advance (10%)</Text>
          <Text style={styles.advance}>₹ {advance}</Text>
        </View>

      </View>

      {/* 🔥 PAY BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Booking", {
            ...route.params,
            totalPrice,
            advance
          })
        }
      >
        <Text style={styles.buttonText}>
          Pay ₹ {advance} & Confirm Booking
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },

  vehicle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    fontSize: 14,
    marginBottom: 4
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10
  },

  total: {
    fontSize: 16,
    fontWeight: "bold"
  },

  advance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green"
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});