import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen({ navigation }) {

  return (
   <ScrollView
    style={{ flex: 1, backgroundColor: "#f8f9fb" }}
    contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
    showsVerticalScrollIndicator={false}
   >

      {/* 👋 HEADER */}
      <Text style={styles.greeting}>Welcome to LuckyRide</Text>
      <Text style={styles.sub}>Your trusted vehicle rental service</Text>

      {/* 🔍 SEARCH BAR */}
<View style={styles.searchBox}>

  {/* Input field */}
  <TextInput
    placeholder="Enter pickup location..."
    placeholderTextColor="#777"
    style={{ flex: 1, color: "#000" }}
  />

  {/* Right side icon */}
  <TouchableOpacity onPress={() => navigation.navigate("Vehicles")}>
    <Text style={{ fontSize: 20 }}>🚘</Text>
  </TouchableOpacity>

</View>

      {/* 🚀 QUICK ACTIONS */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("Vehicles")}
        >
          <Text style={styles.icon}>🚕</Text>
          <Text style={styles.cardText}>Local Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("Vehicles")}
        >
          <Text style={styles.icon}>🚌</Text>
          <Text style={styles.cardText}>Long Trip</Text>
        </TouchableOpacity>
      </View>

      {/* 🚘 VEHICLE TYPES */}
      <Text style={styles.sectionTitle}>Popular Vehicles</Text>

      <View style={styles.row}>
        <View style={styles.vehicleCard}>
          <Text style={styles.icon}>🛺</Text>
          <Text style={styles.vehicleText}>
          Auto
        </Text>
        </View>

        <View style={styles.vehicleCard}>
          <Text style={styles.icon}>🚗</Text>
          <Text style={styles.vehicleText}>
          Car
        </Text>
        </View>

        <View style={styles.vehicleCard}>
          <Text style={styles.icon}>🚐</Text>
          <Text style={styles.vehicleText}>
          Traveller
        </Text>
        </View>
      </View>

      {/* 🔥 OFFER CARD */}
      <View style={styles.offerCard}>
        <Text style={styles.offerTitle}> 😎 Special Offer</Text>
        <Text style={styles.offerText}>
          🔥 Get 10% OFF on your first ride 🔥
        </Text>
      </View>

      {/* 🕒 RECENT RIDES */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Kadapa → Bangalore</Text>
        <Text style={styles.cardSub}>₹3500 • Completed</Text>
      </View>

      {/* 📞 SUPPORT */}
      <View style={styles.supportCard}>
        <Text style={styles.cardTitle}>Need Help?</Text>
        <Text style={styles.cardSub}>Contact support anytime</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    padding: 16
  },

  searchBox: {
  backgroundColor: "#fff",
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderRadius: 12,
  marginBottom: 20,
  elevation: 3,
  flexDirection: "row",      // 👈 IMPORTANT
  alignItems: "center"
},

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  actionCard: {
    backgroundColor: "#072441",
    padding: 20,
    borderRadius: 16,
    width: "48%",
    alignItems: "center"
  },

  cardText: {
    color: "#fff",
    marginTop: 10
  },

  icon: {
    fontSize: 28
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600"
  },

  vehicleCard: {
    backgroundColor: "#030a38",
    padding: 15,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
    elevation: 3
  },

  vehicleText: {
   color: "#fff"
  },

  offerCard: {
    backgroundColor: "#072441",
    padding: 20,
    borderRadius: 16,
    marginTop: 20
  },

  offerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  offerText: {
    color: "#ccc",
    marginTop: 5
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3
  },

  cardTitle: {
    fontWeight: "600"
  },

  cardSub: {
    color: "#666",
    marginTop: 5
  },

  supportCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    alignItems: "center",
    elevation: 3
  },

greeting: {
  fontSize: 26,
  fontWeight: "bold",
  color: "#150771",
  marginTop: 50
},

sub: {
  fontSize: 15,
  color: "#000000",
  marginTop: 4,
  marginBottom: 20
}

});