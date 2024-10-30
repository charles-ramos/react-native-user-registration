import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Make sure Parse is initialized in your App.tsx or index.js
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  '',     // Replace with your Parse Application ID
  ''      // Replace with your Parse JavaScript key
);
Parse.serverURL = 'https://parseapi.back4app.com/'; 

const UserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Create a new Parse User instance
      const user = new Parse.User();
      user.set('username', email); // Using email as username
      user.set('email', email);
      user.set('password', password);

      // Call sign up method
      await user.signUp();
      
      // Success
      Alert.alert(
        'Success!',
        'User was successfully created!'
      );
      
      // Clear form
      setEmail('');
      setPassword('');
      
    } catch (error: any) {
      // Error handling
      Alert.alert(
        'Error!',
        error.message || 'An error occurred during registration'
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button
        title="Register"
        onPress={handleRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default UserRegistration;