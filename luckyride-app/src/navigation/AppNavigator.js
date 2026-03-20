import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";

import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import TripTypeScreen from "../screens/TripTypeScreen";
import VehicleScreen from "../screens/VehicleScreen";

import BookingScreen from "../screens/BookingScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";

import MyRidesScreen from "../screens/MyRidesScreen";
import TabNavigator from "./TabNavigator";

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

        {/* LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* MAIN APP */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* Vehicle Selection */}
        <Stack.Screen name="Vehicles" component={VehicleScreen} />

        {/* Trip Type */}
        <Stack.Screen name="TripType" component={TripTypeScreen} />

        {/* Booking Details */}
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />

        {/* Payment */}
        <Stack.Screen name="Payment" component={PaymentScreen} />

        {/* Booking */}
        <Stack.Screen name="Booking" component={BookingScreen} />

        {/* Booking Success */}
        <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />

        {/* Booking History */}
        <Stack.Screen name="History" component={HistoryScreen} />

         {/* My Rides */}
         <Stack.Screen name="MyRides" component={MyRidesScreen} />
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}