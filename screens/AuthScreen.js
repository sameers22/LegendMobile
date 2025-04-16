import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';

const AuthScreen = ({ navigation }) => {
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

      <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
        <Text style={styles.subtitle}>Welcome to</Text>

        <Text style={styles.brandLine}>
          <Text style={styles.legend}>LEGEND </Text>
          <Text style={styles.cookhouse}>COOKHOUSE</Text>
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  subtitle: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '400',
  },
  brandLine: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  legend: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cookhouse: {
    color: 'yellow',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1.5,
  },
  button: {
    backgroundColor: '#ffffffaa',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
  },
  buttonPressed: {
    backgroundColor: '#ffffffcc',
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AuthScreen;
