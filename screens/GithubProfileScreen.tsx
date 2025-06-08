import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'GitHubProfile'>;

export default function GithubProfileScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: `https://github.com/${route.params.username}` }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});








