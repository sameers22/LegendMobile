import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { CartProvider } from './contexts/CartContext';

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
import LegendVideosScreen from './screens/LegendVideosScreen';
import LegendFeedScreen from './screens/LegendFeedScreen';
import CartScreen from './screens/CartScreen';
import CheckoutWeb from './screens/CheckoutWeb';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Menu" component={MenuScreen} />
    <Drawer.Screen name="Table Booking" component={TableBookingScreen} />
    <Drawer.Screen name="Sauces" component={SaucesScreen} />
    <Drawer.Screen name="Cart" component={CartScreen} />
    <Drawer.Screen name="Franchise" component={FranchiseScreen} />
    <Drawer.Screen name="Account" component={AccountScreen} />
    <Drawer.Screen name="Legend Feed" component={LegendFeedScreen} />
  </Drawer.Navigator>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && (currentUser.emailVerified || currentUser.isAnonymous)) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Pay" component={PayScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Main" component={MainDrawer} />
              <Stack.Screen name="CheckoutWeb" component={CheckoutWeb} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
