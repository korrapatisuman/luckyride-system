import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from "react-native";
import API from "../services/api";

export default function MyRidesScreen() {

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 🔥 FETCH BOOKINGS
  const fetchRides = async () => {
  try {
    const res = await API.get(`/bookings/user/${global.user?.phone}`);
    setRides(res.data);
  } catch (err) {
    console.log("Fetch error:", err.message);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};


  useEffect(() => {
    fetchRides();
  }, []);

  // 🔄 PULL TO REFRESH
  const onRefresh = () => {
    setRefreshing(true);
    fetchRides();
  };

  // 🎨 STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED":
        return "#2196F3";
      case "CONFIRMED":
        return "#4CAF50";
      case "COMPLETED":
        return "#9E9E9E";
      default:
        return "#000";
    }
  };

  const getVehicleIcon = (type) => {
  switch (type) {
    case "Car 4+1":
      return "🚘";
      case "Car 9+1":
      return "🚙";
    case "Traveller 24 Seater":
      return "🚌";
      case "Traveller 12 Seater":
        return "🚐";
    case "Auto":
      return "🛺";
    default:
      return "🚘";
  }
};

  // 🚗 RIDE CARD
  const renderItem = ({ item }) => (
    <View style={styles.card}>

      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
  
  <Text style={{ fontSize: 20, marginRight: 6 }}>
    {getVehicleIcon(item.vehicleType)}
  </Text>

  <Text style={styles.vehicle}>
    {item.vehicleType}
  </Text>

   </View>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>

      <Text style={styles.text}>Trip: {item.tripType}</Text>
      <Text style={styles.text}>Date: {item.pickupDate}</Text>
      <Text style={styles.text}>Days: {item.days}</Text>

      {item.distance > 0 && (
        <Text style={styles.text}>
          Distance: {item.distance.toFixed(1)} km
        </Text>
      )}

      <Text style={styles.price}>
        ₹ {item.totalPrice}
      </Text>

      <Text style={styles.advance}>
        Advance Paid: ₹ {item.advancePaid}
      </Text>

    </View>
  );

  // ⏳ LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading rides...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={rides}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 15 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.center}>
          <Text>No rides yet 🚗</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  vehicle: {
    fontSize: 18,
    fontWeight: "bold"
  },

  status: {
    fontSize: 14,
    fontWeight: "bold"
  },

  text: {
    fontSize: 14,
    marginBottom: 4
  },

  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32"
  },

  advance: {
    fontSize: 14,
    color: "#555"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});