import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        Alert.alert('Success', 'Logged in successfully!');
        // Navigate to home screen
      } else {
        Alert.alert('Email Not Verified', 'Please verify your email before logging in.');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your email to reset password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Reset Email Sent', 'Check your inbox to reset your password.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      Alert.alert('Guest Login', 'You are now logged in as a guest.');
      // Navigate to home screen or guest experience
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={handlePasswordReset} style={styles.link}>
        Forgot your password?
      </Text>
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Don’t have an account? Register
      </Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Continue as Guest" onPress={handleAnonymousLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' }
});

export default LoginScreen;
