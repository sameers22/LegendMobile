import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const FranchiseScreen = () => {
  const injectedCSS = `
    const style = document.createElement('style');
    style.innerHTML = \`
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
      }

      /* Move content up to hide top nav */
      body {
        position: relative;
        top: -120px; /* adjust this value until header disappears */
      }

      header, nav, .header, .topbar, .sidebar, footer {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
      }
    \`;
    document.head.appendChild(style);
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://legendfranchise.com' }}
        injectedJavaScript={injectedCSS}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#ffcc00" style={styles.loader} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default FranchiseScreen;
