import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const TableBookingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
      <WebView
        originWhitelist={['*']}
        style={{ flex: 1 }}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://static.elfsight.com/platform/platform.js" async></script>
              </head>
              <body style="margin:0;padding:0;">
                <div class="elfsight-app-f601f47a-8895-4c01-961a-01d50bbfde6a" data-elfsight-app-lazy></div>
              </body>
            </html>
          `
        }}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // optional, set your background
  },
  innerContainer: {
    flex: 1,
    paddingTop: 10, // adjust padding as needed
  },
});

export default TableBookingScreen;
