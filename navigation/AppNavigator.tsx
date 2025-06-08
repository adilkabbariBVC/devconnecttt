import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from '../screens/SignUpScreen';
import MapScreen from '../screens/MapScreen';
import GithubProfileScreen from '../screens/GithubProfileScreen';
// import { RootStackParamList } from '@/types';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isSignedUp, setIsSignedUp] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('githubUsername').then(username => {
      setIsSignedUp(!!username);
    });
  }, []);

  if (isSignedUp === null) return null; // Optional splash/loading state

  return (
    <Stack.Navigator initialRouteName={isSignedUp ? 'Map' : 'SignUp'}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="GitHubProfile" component={GithubProfileScreen} />
    </Stack.Navigator>
  );
}


















