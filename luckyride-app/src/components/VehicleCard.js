import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VehicleCard({ vehicle, onSelect }) {

  return (

    <TouchableOpacity style={styles.card} onPress={onSelect}>

      <Text style={styles.name}>{vehicle.vehicleName}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Base Price:</Text>
        <Text style={styles.value}>₹{vehicle.pricePerDay}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Driver Charge:</Text>
        <Text style={styles.value}>
             {vehicle.seatingCapacity} Seats
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Included KM:</Text>
        <Text style={styles.value}>
            ₹{vehicle.pricePerKm}/km
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Extra KM:</Text>
        <Text style={styles.value}>
          {vehicle.vehicleType}
        </Text>
      </View>

      <View style={styles.selectBtn}>
        <Text style={styles.selectText}>Select Vehicle</Text>
      </View>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2
  },

  label: {
    color: "#555"
  },

  value: {
    fontWeight: "bold"
  },

  selectBtn: {
    marginTop: 10,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 6,
    alignItems: "center"
  },

  selectText: {
    color: "#fff",
    fontWeight: "bold"
  }

});