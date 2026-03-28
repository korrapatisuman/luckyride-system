import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TripTypeScreen({ route, navigation }) {

  const { vehicle, pickup } = route.params;

  const selectTrip = (type) => {
    navigation.navigate("BookingDetails", {
      vehicle,
      tripType: type,
      pickup
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Select Trip Type</Text>

      {/* LOCAL */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => selectTrip("Local")}
      >
        <Text style={styles.text}>🚕 Local Trip</Text>
        <Text style={styles.sub}>8 hrs / 80 km included</Text>
      </TouchableOpacity>

      {/* OUTSTATION */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => selectTrip("Outstation")}
      >
        <Text style={styles.text}>🚗 Outstation Trip</Text>
        <Text style={styles.sub}>Min 300 km/day</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center"
  },
  button: {
    marginVertical: 10
  },
  sub: {
  fontSize: 12,
  color: "#777",
  marginTop: 5
}
});