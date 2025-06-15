import api from '@/src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
      const trimmedUsername = username.trim();
      const user = await getUserData(trimmedUsername);
      if (!user || !user.login) throw new Error();

      // Check if user already exists in backend
      const existing = await api.get(`/users?login=${trimmedUsername}`);
      if (existing.data.length > 0) {
        Alert.alert('User Already Registered', 'This user already exists in the system.');
        await AsyncStorage.setItem('githubUsername', trimmedUsername);
        navigation.replace('Map');
        return;
      }

      // Get location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is needed.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const newUser = {
        login: user.login,
        name: user.name || user.login,
        avatar_url: user.avatar_url || '',
        bio: user.bio || '',
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      };

      // Send to backend
      await api.post('/users', newUser);

      // Save locally only the username to check for login
      await AsyncStorage.setItem('githubUsername', user.login);

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














