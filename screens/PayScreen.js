import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const PayScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate scale and fade-in
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Transition to next screen after a short delay
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/restaurant_hero.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        isMuted
        shouldPlay
      />

      <View style={styles.overlay}>
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[
            styles.logo,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        />
        <Animated.Text style={[styles.text, { opacity: opacityAnim }]}>
          Welcome to Legend Cookhouse
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PayScreen;
