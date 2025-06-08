import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {  Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Text style={styles.bottomText}>
       DevConnect  
       <FontAwesome name="connectdevelop" size={24} color="blue" />
       {/* <MaterialCommunityIcons name="connection" size={24} color="blue" /> */}
      </Text>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  
  bottomText: { 
    fontSize: 20,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'left',
  }
});


