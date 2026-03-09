import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VehicleCard({ vehicle, onSelect }) {

  return (

    <TouchableOpacity style={styles.card} onPress={onSelect}>

      <Text style={styles.name}>{vehicle.name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Day Rent:</Text>
        <Text style={styles.value}>₹{vehicle.basePrice}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Driver Charge:</Text>
        <Text style={styles.value}>₹{vehicle.driverCharge}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Included Distance:</Text>
        <Text style={styles.value}>{vehicle.includedKm} km</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Extra Charge:</Text>
        <Text style={styles.value}>₹{vehicle.extraKmPrice}/km</Text>
      </View>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },

  label: {
    fontSize: 14,
    color: "#555"
  },

  value: {
    fontSize: 14,
    fontWeight: "bold"
  }

});