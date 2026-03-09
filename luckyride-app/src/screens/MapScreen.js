import { getDistance } from "geolib";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export default function MapScreen({ navigation }) {

  if (Platform.OS === "web") {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>Maps are available only on mobile 📱</Text>
      </View>
    );
  }

  const Maps = require("react-native-maps");
  const MapView = Maps.default;
  const Marker = Maps.Marker;

  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [distance, setDistance] = useState(0);

  const handleMapPress = (event) => {

    const coordinate = event.nativeEvent.coordinate;

    if (!pickup) {
      setPickup(coordinate);
    } else if (!drop) {
      setDrop(coordinate);

      const dist = getDistance(pickup, coordinate) / 1000;
      setDistance(dist);
    }
  };

  const calculateFare = () => {

    const baseFare = 50;
    const perKm = 12;

    return Math.round(baseFare + distance * perKm);
  };

  return (
    <View style={{flex:1}}>

      <MapView
        style={{flex:1}}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >

        {pickup && (
          <Marker coordinate={pickup} title="Pickup Location" />
        )}

        {drop && (
          <Marker coordinate={drop} title="Drop Location" />
        )}

      </MapView>

      {distance > 0 && (
        <View
          style={{
            position:"absolute",
            bottom:20,
            left:20,
            right:20,
            backgroundColor:"white",
            padding:15,
            borderRadius:10
          }}
        >

          <Text>Distance: {distance.toFixed(2)} km</Text>

          <Text>Estimated Fare: ₹{calculateFare()}</Text>

          <TouchableOpacity
            style={{
              marginTop:10,
              backgroundColor:"black",
              padding:12,
              borderRadius:8,
              alignItems:"center"
            }}
            onPress={() =>
              navigation.navigate("Booking", {
                price: calculateFare(),
                distance: distance
              })
            }
          >
            <Text style={{color:"white"}}>Book Ride</Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}