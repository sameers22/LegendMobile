import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PayScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3000); // 3 seconds splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to Legend Cookhouse</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  logo: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 20 },
  text: { color: '#fff', fontSize: 16 }
});

export default PayScreen;
