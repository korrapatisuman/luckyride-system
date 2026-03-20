import { Button, StyleSheet, Text, View } from "react-native";

export default function TripTypeScreen({ route, navigation }) {

  const { vehicle } = route.params;

  const selectTrip = (type) => {
    navigation.navigate("BookingDetails", {
      vehicle: vehicle,
      tripType: type
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Select Trip Type</Text>

      <View style={styles.button}>
        <Button
          title="Local Trip"
          onPress={() => selectTrip("Local Trip")}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Long Trip"
          onPress={() => selectTrip("Long Trip")}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center"
  },
  button: {
    marginVertical: 10
  }
});