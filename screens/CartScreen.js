import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Linking } from 'react-native';
import { createCheckout } from '../shopify'; // ✅ adjust the path to where your Shopify file is


const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, getCheckout } = useCart();
  const navigation = useNavigation();

  const handleCheckout = async () => {
    if (!cartItems.length) return;
  
    try {
      const checkout = await createCheckout(cartItems);
      if (checkout?.webUrl) {
        setCheckoutUrl(checkout.webUrl); // ✅ Instead of Linking.openURL
      } else {
        Alert.alert('Checkout Error', 'Checkout URL not found.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Checkout Failed', err.message || 'Please try again.');
    }
  };
  
  
  
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.variant.productTitle}</Text>
      <Text style={styles.price}>Qty: {item.quantity}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.variant.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.variant?.id ? `${item.variant.id}` : `item-${index}`}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  list: { paddingBottom: 20 },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#555', marginVertical: 5 },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff4d4d',
    padding: 6,
    borderRadius: 8,
  },
  removeButtonText: { color: '#fff' },
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 15,
    marginTop: 15,
  },
  checkoutButton: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  clearButton: {
    alignItems: 'center',
    padding: 10,
  },
  clearText: {
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#555',
  },
});

export default CartScreen;
