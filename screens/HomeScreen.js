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
    if (yOffset > 100 && !showBanner) {
      setShowBanner(true);
    } else if (yOffset <= 100 && showBanner) {
      setShowBanner(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={require('../assets/restaurant_hero.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        isMuted
        shouldPlay
      />

      {/* Scrollable Content */}
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

        <View style={styles.spacer} />

        {/* ✅ Banner + Button Wrapper */}
        {showBanner && (
          <>
            <View style={styles.bannerWrapper}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://static.elfsight.com/platform/platform.js" async></script>
                        <style>body { margin: 0; padding: 0; }</style>
                      </head>
                      <body>
                        <div class="elfsight-app-e1a2565e-be41-4baf-972d-2e8d95b112a7" data-elfsight-app-lazy></div>
                      </body>
                    </html>
                  `,
                }}
                style={styles.webview}
              />

              {/* View Menu Button */}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate('Menu')}
                >
                  <Text style={styles.menuButtonText}>View Menu</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ✅ Reviews Widget WebView */}
            <View style={styles.reviewWrapper}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://static.elfsight.com/platform/platform.js" async></script>
                        <style>body { margin: 0; padding: 0; }</style>
                      </head>
                      <body>
                        <div class="elfsight-app-931f6580-4ef0-4588-a52b-7c79af7c51f4" data-elfsight-app-lazy></div>
                      </body>
                    </html>
                  `,
                }}
                style={styles.webview}
              />
            </View>
          </>
        )}

        <View style={{ height: 200 }} />
      </ScrollView>
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
  },
  spacer: {
    height: 0,
  },
  bannerWrapper: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  webview: {
    height: 1600, // Adjust this based on Elfsight widget height
    backgroundColor: 'transparent',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  menuButton: {
    backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  menuButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  reviewWrapper: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 40,
  },
});

export default HomeScreen;
