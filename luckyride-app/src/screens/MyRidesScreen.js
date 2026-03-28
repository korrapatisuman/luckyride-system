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

      if (!global.user?.phone) {
        console.log("No user phone found");
        return;
      }

      const res = await API.get(`/bookings/user?login=${global.user?.phone || global.user?.email}`)
      setRides(res.data || []);

    } catch (err) {
      console.log("Fetch error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRides();

    // 🔄 AUTO REFRESH EVERY 10s (LIKE REAL APPS)
    const interval = setInterval(fetchRides, 10000);

    return () => clearInterval(interval);
  }, []);

  // 🔄 PULL TO REFRESH
  const onRefresh = () => {
    setRefreshing(true);
    fetchRides();
  };

  // 🎨 STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED": return "#2196F3";
      case "CONFIRMED": return "#4CAF50";
      case "STARTED": return "#ff9800";
      case "COMPLETED": return "#9E9E9E";
      case "CANCELLED": return "#f44336";
      default: return "#000";
    }
  };

  // 🚗 ICON
  const getVehicleIcon = (type) => {
    switch (type) {
      case "Auto": return "🛺";
      case "Car": return "🚗";
      case "Traveller": return "🚐";
      default: return "🚘";
    }
  };

  // 🚗 CARD
  const renderItem = ({ item }) => {

    const isDriverAssigned = item.driverName;

    return (
      <View style={styles.card}>

        {/* HEADER */}
        <View style={styles.row}>
          <View style={styles.vehicleRow}>
            <Text style={styles.icon}>
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

        {/* DETAILS */}
        <Text style={styles.text}>📍 {item.pickupLocation}</Text>

        {item.dropLocation && (
          <Text style={styles.text}>➡ {item.dropLocation}</Text>
        )}

        <Text style={styles.text}>📅 {item.pickupDate}</Text>
        <Text style={styles.text}>🕒 {item.days} day(s)</Text>

        {item.distance > 0 && (
          <Text style={styles.text}>
            📏 {item.distance.toFixed(1)} km
          </Text>
        )}

        {/* DRIVER */}
        <View style={styles.driverBox}>
          <Text style={styles.driverTitle}>Driver</Text>
          <Text style={styles.text}>
            {item.driverName || "Assigning..."}
          </Text>
          <Text style={styles.text}>
            {item.driverPhone || ""}
          </Text>
        </View>

        {/* PRICE */}
        <Text style={styles.price}>₹ {item.totalPrice}</Text>

        <Text style={styles.advance}>
          Advance Paid: ₹ {item.advancePaid}
        </Text>

      </View>
    );
  };

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
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 4
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  icon: {
    fontSize: 20,
    marginRight: 6
  },

  vehicle: {
    fontSize: 16,
    fontWeight: "bold"
  },

  status: {
    fontSize: 13,
    fontWeight: "bold"
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444"
  },

  driverBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10
  },

  driverTitle: {
    fontWeight: "bold",
    marginBottom: 4
  },

  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32"
  },

  advance: {
    fontSize: 13,
    color: "#666"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});