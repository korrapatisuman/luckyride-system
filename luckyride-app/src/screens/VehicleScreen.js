import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import API from "../services/api";

export default function VehicleScreen({ navigation, route }) {

  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH VEHICLES FROM BACKEND
    const fetchVehicles = async () => {
  try {
    const res = await API.get("/vehicles");

    console.log("VEHICLES RAW:", res.data);

    // ✅ handle both formats
    if (res.data?.success) {
      setVehicles(res.data.data || []);
    } else if (Array.isArray(res.data)) {
      // fallback (if backend returns plain list)
      setVehicles(res.data);
    } else {
      alert(res.data.message || "Failed to fetch vehicles");
      setVehicles([]);
    }

  } catch (err) {
    console.log("Vehicle fetch error:", err?.response?.data || err.message);
    alert(err?.response?.data?.message || "Server error");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleContinue = () => {
    if (!selected) {
      alert("Please select a vehicle");
      return;
    }

      navigation.navigate("TripType", {
        vehicle: selected,
          pickup: route?.params?.pickup // optional safe
     });
  };

  const getIcon = (type) => {
    switch (type) {
      case "Auto": return "🛺";
      case "Car": return "🚗";
      case "Traveller": return "🚐";
      default: return "🚗";
    }
  };

  const renderItem = ({ item }) => {

    const isSelected = selected?.id === item.id;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelected(item)}
      >

        <Text style={styles.icon}>
          {getIcon(item.vehicleType)}
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {item.vehicleName}
          </Text>

          <Text style={styles.price}>
            ₹{item.pricePerKm}/km
          </Text>

          <Text style={styles.seats}>
            Seats: {item.seatingCapacity}
          </Text>
        </View>

        {isSelected && <Text style={styles.check}>✔</Text>}
      </TouchableOpacity>
    );
  };

  // ⏳ LOADING
   if (!loading && vehicles.length === 0) {
  return (
    <View style={styles.center}>
      <Text>No vehicles available</Text>
    </View>
  );
}

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Choose Your Vehicle</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#000"
  },

  icon: {
    fontSize: 32,
    marginRight: 15
  },

  name: {
    fontSize: 16,
    fontWeight: "600"
  },

  price: {
    color: "#777",
    marginTop: 3
  },

  seats: {
    fontSize: 12,
    color: "#999"
  },

  check: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold"
  },

  button: {
    position: "absolute",
    bottom: 30,
    left: 15,
    right: 15,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});