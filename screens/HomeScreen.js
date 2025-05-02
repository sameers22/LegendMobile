import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';

const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const [showBanner, setShowBanner] = useState(false);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowBanner(yOffset > 100);
  };

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

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.overlay}>
          <Text style={styles.header}>
            <Text style={styles.legend}>LEGEND </Text>
            <Text style={styles.cookhouse}>COOKHOUSE</Text>
          </Text>
          <Text style={styles.subText}>
            Guyanese, Caribbean & American fusion cuisine restaurant & bar.
          </Text>
        </View>

        {showBanner && (
          <>
            {/* Elfsight Banner + Button */}
            <View style={[styles.widgetWrapper, { marginBottom: 0 }]}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://static.elfsight.com/platform/platform.js" async></script><style>body{margin:0;padding:0;background:white;}</style></head><body><div class="elfsight-app-e1a2565e-be41-4baf-972d-2e8d95b112a7" data-elfsight-app-lazy></div></body></html>`
                }}
                style={styles.webview}
              />
            </View>

            {/* Map */}
            <View style={[styles.mapWrapper, { marginBottom: 0 }]}>
              <WebView
                originWhitelist={['*']}
                style={styles.map}
                source={{
                  html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body, html { margin: 0; padding: 0; background: white; }</style></head><body><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.12291551076032!2d-73.80296798584818!3d40.67470380960766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2672388b8efd1%3A0x845e0126ebd0b8b!2sLegend%20Cookhouse!5e0!3m2!1sen!2sus!4v1741354079338!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></body></html>`
                }}
              />
            </View>

            {/* Reviews */}
            <View style={[styles.widgetWrapper, { marginBottom: 0 }]}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://static.elfsight.com/platform/platform.js" async></script><style>body{margin:0;padding:0;background:white;}</style></head><body><div class="elfsight-app-931f6580-4ef0-4588-a52b-7c79af7c51f4" data-elfsight-app-lazy></div></body></html>`
                }}
                style={styles.webview}
              />
            </View>

            {/* Contact Form */}
            <View style={[styles.widgetWrapper, { marginBottom: 0 }]}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://static.elfsight.com/platform/platform.js" async></script><style>body{margin:0;padding:0;background:white;}</style></head><body><div class="elfsight-app-4ec457aa-f6a0-4e2e-a27f-8b61b75a1ecd" data-elfsight-app-lazy></div></body></html>`
                }}
                style={styles.webview}
              />
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.floatingText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollArea: { flex: 1 },
  scrollContent: {
    minHeight: screenHeight + 600,
  },
  overlay: {
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legend: { color: '#fff' },
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
  },
  widgetWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  webview: {
    height: 1600,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 3,
  },
  menuButtonText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#000',
    textAlign: 'center',
  },
  mapWrapper: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    backgroundColor: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
