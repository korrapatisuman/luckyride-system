import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import API from "../api/api";

export default function BookingScreen({ route, navigation }) {

  const { vehicle, price, distance, pickup, drop } = route.params;

  const [days, setDays] = useState("1");

  const calculatePrice = () => {

    if (price) return price; // price from map

    const base = vehicle.basePrice;
    const driver = vehicle.driverCharge;

    return (base + driver) * parseInt(days || 1);
  };

  const handleBooking = async () => {

    try {

      const bookingData = {

        vehicleType: vehicle?.name || "Standard",
        days: parseInt(days),
        price: calculatePrice(),
        pickupLocation: pickup
          ? `${pickup.latitude},${pickup.longitude}`
          : "User Pickup",

        dropLocation: drop
          ? `${drop.latitude},${drop.longitude}`
          : "User Drop",

        status: "BOOKED"

      };

      const response = await API.post("/bookings", bookingData);

      console.log("Booking Saved:", response.data);

      alert("Ride Booked Successfully 🚕");

      navigation.replace("BookingSuccess");

    } catch (error) {

      console.log(error);
      alert("Booking Failed");

    }
  };

  return (

    <View style={{padding:20}}>

      <Text style={{fontSize:18}}>
        Vehicle: {vehicle?.name || "Standard"}
      </Text>

      <Text style={{marginTop:10}}>
        Distance: {distance ? distance.toFixed(2) + " km" : "N/A"}
      </Text>

      <Text style={{marginTop:10,fontSize:20}}>
        Total Price: ₹{calculatePrice()}
      </Text>

      <TouchableOpacity
        style={{
          marginTop:20,
          backgroundColor:"black",
          padding:15,
          borderRadius:8,
          alignItems:"center"
        }}
        onPress={handleBooking}
      >

        <Text style={{color:"white"}}>
          Confirm Booking
        </Text>

      </TouchableOpacity>

    </View>

  );

}