import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VehicleSelectionScreen({ navigation }) {

  const selectVehicle = (vehicle) => {

    navigation.navigate("Booking", {
      vehicle: {
        name: vehicle,
        basePrice: 1500,
        driverCharge: 500,
        includedKm: 150,
        extraKmPrice: 12
      }
    });

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Select Your Vehicle</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => selectVehicle("Auto")}
      >
        <Text style={styles.vehicle}>🚕 Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => selectVehicle("Car 4+1")}
      >
        <Text style={styles.vehicle}>🚗 Car (4+1)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => selectVehicle("Traveller 12")}
      >
        <Text style={styles.vehicle}>🚐 Traveller (12 Seater)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => selectVehicle("Traveller 24")}
      >
        <Text style={styles.vehicle}>🚐 Traveller (24 Seater)</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:30
  },

  card:{
    width:"80%",
    padding:20,
    backgroundColor:"#a8ee7a",
    marginVertical:10,
    borderRadius:10,
    alignItems:"center"
  },

  vehicle:{
    fontSize:20
  }

});