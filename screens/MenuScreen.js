import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Linking,
  ScrollView,
  AppState,
} from 'react-native';
import { WebView } from 'react-native-webview';

const MenuScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const [screenKey, setScreenKey] = useState(0);
  const navigation = useNavigation();

  const handleOrderPress = (url) => {
    Linking.openURL(url);
  };

  const resetChoice = () => {
    setSelectedOption(null);
    setLoading(true);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setScreenKey(prev => prev + 1);
        resetChoice();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const renderToggleHeader = () => (
    <View style={styles.toggleHeader}>
      <Text style={styles.headerText}>
        {selectedOption === 'dinein' ? 'Dine In Menu' : 'Take Out Menu'}
      </Text>
      <TouchableOpacity style={styles.changeButton} onPress={resetChoice}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDineIn = () => (
    <View style={{ flex: 1 }}>
      {renderToggleHeader()}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://static.elfsight.com/platform/platform.js" async></script>
              </head>
              <body style="margin:0;padding:0;background-color:#000;">
                <div class="elfsight-app-8c5dbbf2-548b-46d4-ab01-13f1cf46406e" data-elfsight-app-lazy></div>
              </body>
            </html>
          `,
        }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );

  const renderTakeOut = () => (
    <View style={{ flex: 1 }}>
      {renderToggleHeader()}
      <ScrollView contentContainerStyle={styles.takeOutContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate('MenuList')}
        >
          <Text style={styles.buttonText}>Order from App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleOrderPress('https://www.ubereats.com')}
        >
          <Text style={styles.buttonText}>Order with Uber Eats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleOrderPress('https://www.doordash.com')}
        >
          <Text style={styles.buttonText}>Order with DoorDash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleOrderPress('https://www.grubhub.com')}
        >
          <Text style={styles.buttonText}>Order with Grubhub</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderOptionPrompt = () => (
    <View style={styles.promptContainer}>
      <Text style={styles.promptText}>How would you like to order?</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSelectedOption('dinein')}
      >
        <Text style={styles.buttonText}>Dine In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSelectedOption('takeout')}
      >
        <Text style={styles.buttonText}>Take Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} key={screenKey}>
      {selectedOption === null && renderOptionPrompt()}
      {selectedOption === 'dinein' && renderDineIn()}
      {selectedOption === 'takeout' && renderTakeOut()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  promptContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,
  },
  promptText: { color: '#fff', fontSize: 22, fontWeight: '600', marginBottom: 30 },
  optionButton: {
    backgroundColor: '#333', paddingVertical: 15, paddingHorizontal: 30,
    borderRadius: 8, marginVertical: 10, width: '80%', alignItems: 'center',
  },
  orderButton: {
    backgroundColor: '#444', paddingVertical: 15, paddingHorizontal: 20,
    borderRadius: 8, marginVertical: 10, width: '85%', alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '500' },
  loader: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10,
  },
  takeOutContainer: {
    flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20,
  },
  toggleHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#111',
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  changeButton: {
    backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5,
  },
  changeButtonText: { color: '#fff', fontSize: 15, fontWeight: '500' },
});

export default MenuScreen;
