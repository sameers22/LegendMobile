import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
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
              <body>
                <div class="elfsight-app-8c5dbbf2-548b-46d4-ab01-13f1cf46406e" data-elfsight-app-lazy></div>
              </body>
            </html>
          `
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MenuScreen;
