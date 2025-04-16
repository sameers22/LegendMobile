import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const HomeScreen = () => {
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
        <Text style={styles.header}>
          <Text style={styles.legend}>LEGEND </Text>
          <Text style={styles.cookhouse}>COOKHOUSE</Text>
        </Text>
        <Text style={styles.subText}>
          Guyanese, Caribbean & American fusion cuisine restaurant & bar.
        </Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legend: {
    color: '#fff',
  },
  cookhouse: {
    color: 'yellow',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  subText: {
    color: '#eee',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  }
});

export default HomeScreen;
