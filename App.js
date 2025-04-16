import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import PayScreen from './screens/PayScreen';
import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import TableBookingScreen from './screens/TableBookingScreen';
import EventBookingScreen from './screens/EventBookingScreen';
import SaucesScreen from './screens/SaucesScreen';
import FranchiseScreen from './screens/FranchiseScreen';
import AccountScreen from './screens/AccountScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 👉 Drawer for sidebar pages
function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Table Booking" component={TableBookingScreen} />
      <Drawer.Screen name="Event Booking" component={EventBookingScreen} />
      <Drawer.Screen name="Sauces" component={SaucesScreen} />
      <Drawer.Screen name="Franchise" component={FranchiseScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pay" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
