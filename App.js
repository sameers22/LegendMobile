import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { CartProvider } from './contexts/CartContext';

// Screens (import as usual)
import PayScreen from './screens/PayScreen';
import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import TableBookingScreen from './screens/TableBookingScreen';
import SaucesScreen from './screens/SaucesScreen';
import FranchiseScreen from './screens/FranchiseScreen';
import AccountScreen from './screens/AccountScreen';
import LegendFeedScreen from './screens/LegendFeedScreen';
import CartScreen from './screens/CartScreen';
import CheckoutWeb from './screens/CheckoutWeb';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
  drawerActiveTintColor: '#FFD700',
  drawerInactiveTintColor: '#ffffff',
  drawerActiveBackgroundColor: '#333333',
  drawerStyle: {
    backgroundColor: '#000000',
  },
};

const MainDrawer = () => (
  <Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
    <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="home" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Menu" component={MenuScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="restaurant" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Table Booking" component={TableBookingScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="calendar" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Sauces" component={SaucesScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="water" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Cart" component={CartScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="cart" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Franchise" component={FranchiseScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="business" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Account" component={AccountScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="person" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
    <Drawer.Screen name="Legend Social" component={LegendFeedScreen} options={{ drawerIcon: ({ focused, size }) => (<Ionicons name="videocam" size={size} color={focused ? '#FFD700' : '#ffffff'} />) }} />
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
      <SafeAreaView style={styles.safeArea}>
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
      </SafeAreaView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // Match your app background
  },
});
