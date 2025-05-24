import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import menuData from './menuData'; // Make sure you export your menuData from a separate file

const MenuListScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {menuData.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.category}>{section.category}</Text>
          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.card}>
              {item.image && (
                <Image source={item.image} style={styles.image} />
              )}
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 20,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: '#444',
    marginTop: 5,
  },
  description: {
    color: '#666',
    marginTop: 5,
    fontSize: 14,
  },
});

export default MenuListScreen;
