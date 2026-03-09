import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import BookingScreen from "../screens/BookingScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MapScreen from "../screens/MapScreen";
import SplashScreen from "../screens/SplashScreen";
import VehicleScreen from "../screens/VehicleScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >

        {/* Splash */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Home */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Select Vehicle */}
        <Stack.Screen name="Vehicles" component={VehicleScreen} />

        {/* Booking */}
        <Stack.Screen name="Booking" component={BookingScreen} />

        {/* Ride History */}
        <Stack.Screen name="History" component={HistoryScreen} />

        {/* Map */}
        {Platform.OS !== "web" && (
        <Stack.Screen name="Map" component={MapScreen} />
     )}

      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccessScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}