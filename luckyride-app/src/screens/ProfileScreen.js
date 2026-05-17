import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadUser = async () => {

      try {

        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

      } catch (err) {
        console.log("USER LOAD ERROR:", err);
      }
    };

    loadUser();

  }, []);

  // ✅ LOGOUT
  const handleLogout = async () => {

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {

            try {

              await AsyncStorage.clear();

              global.user = null;
              global.userToken = null;

              navigation.replace("Login");

            } catch (err) {

              console.log("LOGOUT ERROR:", err);

            }
          }
        }
      ]
    );
  };

  return (

    <View style={styles.container}>

      {/* PROFILE ICON */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👤</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>My Profile</Text>

      {/* USER INFO */}
      <View style={styles.card}>

        <Text style={styles.label}>Phone</Text>

        <Text style={styles.value}>
          {user?.phone || "Not Available"}
        </Text>

        <Text style={styles.label}>Email</Text>

        <Text style={styles.value}>
          {user?.email || "Not Available"}
        </Text>

      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  avatarText: {
    fontSize: 45,
    color: "#fff"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 4
  },

  label: {
    fontSize: 14,
    color: "#777",
    marginTop: 10
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 5
  },

  logoutButton: {
    marginTop: 40,
    backgroundColor: "#000",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});