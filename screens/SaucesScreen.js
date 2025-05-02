import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { fetchProducts } from '../shopify';
import { useCart } from '../contexts/CartContext';

const screenWidth = Dimensions.get('window').width;

const SaucesScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const items = await fetchProducts();
        setProducts(items);
      } catch (err) {
        Alert.alert('Error', 'Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleOpenModal = (item) => {
    const variant = item.variants?.edges?.[0]?.node;
    if (!variant?.id) {
      Alert.alert('Missing Variant', 'This product has no variant ID.');
      return;
    }
    setSelectedProduct({ ...item, variant });
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct?.variant?.id) {
      addToCart({
        ...selectedProduct.variant,
        productTitle: selectedProduct.title,
      });
      setModalVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    const image = item.images?.edges?.[0]?.node?.url;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleOpenModal(item)}
      >
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      {/* Modal for Sauce Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {selectedProduct?.images?.edges?.[0]?.node?.url && (
              <Image
                source={{ uri: selectedProduct.images.edges[0].node.url }}
                style={styles.modalImage}
              />
            )}
            <Text style={styles.modalTitle}>{selectedProduct?.title}</Text>
            <Text style={styles.modalPrice}>
              ${selectedProduct?.variant?.price?.amount}
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.modalButtonText}>Add to Cart</Text>
            </TouchableOpacity>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 10 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: screenWidth / 2.5,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 16,
    color: '#444',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  closeText: {
    color: '#888',
    marginTop: 10,
  },
});

export default SaucesScreen;
