import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import API from "../services/api";


export default function HistoryScreen() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const response = await API.get("/bookings");
      setBookings(response.data);

    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.vehicle}>{item.vehicleType}</Text>

      <Text>Days: {item.days}</Text>

      <Text>Price: ₹{item.price}</Text>

      <Text>Status: {item.status || "Pending"}</Text>

    </View>

  );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>My Rides</Text>

      {bookings.length === 0 ? (
        <Text style={styles.empty}>No rides booked yet</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3
  },

  vehicle: {
    fontSize: 18,
    fontWeight: "bold"
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16
  }

});