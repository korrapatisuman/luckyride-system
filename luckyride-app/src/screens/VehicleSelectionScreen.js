import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import API from "../services/api";

export default function VehicleSelectionScreen({ navigation }) {

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH VEHICLES FROM BACKEND
  useEffect(() => {

    const fetchVehicles = async () => {

      try {

        const res = await API.get("/mobile/vehicles");

        console.log("VEHICLES:", res.data);

        setVehicles(res.data.data);

      } catch (err) {

        console.log(
          "Vehicle fetch error:",
          err?.response?.data || err.message
        );

      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

  }, []);

  // ✅ LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  // ✅ EMPTY
  if (!vehicles.length) {
    return (
      <View style={styles.center}>
        <Text>No Vehicles Found</Text>
      </View>
    );
  }

  // ✅ UI
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Select Your Vehicle
      </Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Booking", {

              vehicle: item,

              tripType: "Outstation",

              pickup: "Pickup Location",

              drop: "Drop Location",

              pickupDate: "2026-05-13",

              days: 1,

              distance: 0,

              totalPrice: item.pricePerKm,

              advance: Math.round(item.pricePerKm * 0.1)

             })
            }
          >

            <Text style={styles.vehicleName}>
              {item.vehicleName}
            </Text>

            <Text>
              Seating: {item.seatingCapacity}
            </Text>

            <Text>
              ₹{item.pricePerKm}/KM
            </Text>

            <Text>
              ₹{item.pricePerDay}/Day
            </Text>

            <Text>
              Type: {item.vehicleType}
            </Text>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  vehicleName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  }

});