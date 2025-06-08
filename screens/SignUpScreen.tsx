import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView from 'react-native-maps';
import type { RootStackParamList } from '../types';
import { getUserData } from '../utils/github';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const savedUsername = await AsyncStorage.getItem('githubUsername');
      if (savedUsername) {
        navigation.replace('Map');
      }
    };
    checkLoggedIn();
  }, []);

  const handleNext = async () => {
    try {
      const user = await getUserData(username.trim());
      if (!user || !user.login) {
        throw new Error();
      }

      await AsyncStorage.setItem('githubUsername', user.login);

      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const alreadyExists = users.some((u: any) => u.login === user.login);

      if (!alreadyExists) {
        users.push(user);
        await AsyncStorage.setItem('users', JSON.stringify(users));
      }

      navigation.replace('Map');
    } catch {
      Alert.alert('Invalid Username', 'Please enter a valid GitHub username.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 51.0447,
          longitude: -114.0719,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Welcome to Devconnect. Enter your GitHub Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. adilkabbariBVC"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#aaa"
          />   
          <Button title="Next" onPress={handleNext} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255,255,255,0.4)', 
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
    color: 'blue',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default SignUpScreen;



