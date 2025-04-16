import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      Alert.alert(
        'Verification Sent',
        'Please check your email and verify before logging in.'
      );
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
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

      <BlurView intensity={80} tint="dark" style={styles.blurBox}>
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.title}>Register</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  blurBox: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
