import { FlatList, StyleSheet, Text, View } from "react-native";
import VehicleCard from "../components/VehicleCard";

const vehicles = [
  {
    id: "1",
    name: "Auto",
    basePrice: 400,
    driverCharge: 0,
    includedKm: 150,
    extraKmPrice: 0
  },
  {
    id: "2",
    name: "Car 4+1",
    basePrice: 1500,
    driverCharge: 500,
    includedKm: 150,
    extraKmPrice: 12
  },
  {
    id: "3",
    name: "Car 9+1",
    basePrice: 2500,
    driverCharge: 500,
    includedKm: 150,
    extraKmPrice: 15
  },
  {
    id: "4",
    name: "Traveller 12+1",
    basePrice: 3500,
    driverCharge: 1000,
    includedKm: 150,
    extraKmPrice: 18
  },
  {
    id: "5",
    name: "Traveller 24+1",
    basePrice: 5000,
    driverCharge: 1500,
    includedKm: 150,
    extraKmPrice: 25
  }
];

export default function VehicleScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Select Your Vehicle</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onSelect={() =>
              navigation.navigate("Booking", { vehicle: item })
            }
          />
        )}
      />

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
    marginBottom: 20,
    textAlign: "center"
  }

});