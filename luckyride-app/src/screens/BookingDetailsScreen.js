import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { getDistance } from "../services/distanceService";
import { cities } from "../utils/cities";

export default function BookingDetailsScreen({ route, navigation }) {

  const { tripType, vehicle } = route.params;

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [filteredPickup, setFilteredPickup] = useState([]);
  const [filteredDrop, setFilteredDrop] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [days, setDays] = useState("1");
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔍 SEARCH
  const handlePickupChange = (text) => {
    setPickup(text);

    const results = cities.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredPickup(results.slice(0, 5)); // limit results
  };

  const handleDropChange = (text) => {
    setDrop(text);

    const results = cities.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredDrop(results.slice(0, 5));
  };

  // 📍 SELECT
  const selectPickup = (city) => {
    setPickup(city.name);
    setPickupCoords({ lat: city.lat, lng: city.lng });
    setFilteredPickup([]);
  };

  const selectDrop = (city) => {
    setDrop(city.name);
    setDropCoords({ lat: city.lat, lng: city.lng });
    setFilteredDrop([]);
  };

  // 📏 DISTANCE
  const calculateDistance = async () => {

    if (!pickupCoords || !dropCoords) {
      alert("Select locations properly");
      return;
    }

    setLoading(true);

    try {
      const km = await getDistance(pickupCoords, dropCoords);
      setDistance(km);
    } catch (err) {
      alert("Distance calculation failed");
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Booking Details</Text>

      <Text style={styles.label}>Trip Type: {tripType}</Text>

      {/* PICKUP */}
      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={handlePickupChange}
      />

      {filteredPickup.length > 0 && (
        <View style={styles.suggestionBox}>
          {filteredPickup.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => selectPickup(item)}>
              <Text style={styles.suggestion}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* DROP */}
      {tripType === "Long Trip" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Drop Location"
            value={drop}
            onChangeText={handleDropChange}
          />

          {filteredDrop.length > 0 && (
            <View style={styles.suggestionBox}>
              {filteredDrop.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => selectDrop(item)}>
                  <Text style={styles.suggestion}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}

      {/* DISTANCE BUTTON */}
      {tripType === "Long Trip" && (
        <TouchableOpacity style={styles.calcBtn} onPress={calculateDistance}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Calculate Distance</Text>
          )}
        </TouchableOpacity>
      )}

      {distance > 0 && (
        <Text style={styles.distance}>
          Distance: {distance.toFixed(2)} km
        </Text>
      )}

      {/* DATE */}
      <TouchableOpacity onPress={() => setShowDate(true)}>
        <Text style={styles.input}>
          {pickupDate || "Select Pickup Date"}
        </Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            if (selectedDate) {
              setPickupDate(selectedDate.toISOString().split("T")[0]);
            }
          }}
        />
      )}

      {/* DAYS */}
      <TextInput
        style={styles.input}
        placeholder="Number of Days"
        keyboardType="numeric"
        value={days}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) setDays(text);
        }}
      />

      {/* CONTINUE */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {

          if (!pickup || !pickupDate || !days) {
            alert("Fill all details");
            return;
          }

          if (tripType === "Long Trip" && distance === 0) {
            alert("Calculate distance first");
            return;
          }

          navigation.navigate("Payment", {
            tripType,
            vehicle,
            pickup,
            drop,
            pickupDate,
            days,
            distance
          });
        }}
      >
        <Text style={styles.buttonText}>Continue to Payment</Text>
      </TouchableOpacity>

    </ScrollView>
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
    marginTop: 100,
    marginBottom: 20
  },

  label: {
    fontSize: 16,
    marginBottom: 10
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },

  suggestionBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },

  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  calcBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  },

  distance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginTop: 10
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }

});