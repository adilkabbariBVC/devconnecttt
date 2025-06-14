import api from '@/src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RootStackParamList, User } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        // Filter out users missing location
        const validUsers = res.data.filter((u: User) => !!u.location);
        setUsers(validUsers);
      } catch (err) {
        console.error('Error loading users:', err);
        Alert.alert('Error', 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('githubUsername');
    navigation.replace('SignUp');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 51.0447,
          longitude: -114.0719,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {users.map((user, index) =>
          user.location ? (
            <Marker
              key={index}
          coordinate={{
        latitude: user.location.latitude + index * 0.9, // slight vertical offset
        longitude: user.location.longitude + index * 0.15, // slight horizontal offset
      }}
              anchor={{ x: 0.5, y: 0.5 }}
              onPress={() => setSelectedUser(user)}
            >
              <View style={styles.markerAvatarWrapper}>
                <Image
                  source={
                    user.avatar_url
                      ? { uri: user.avatar_url }
                      : require('../assets/images/avatar-placeholder.png')
                  }
                  style={styles.markerAvatar}
                />
              </View>
            </Marker>
          ) : null
        )}
      </MapView>

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleSignOut} color="blue" />
      </View>

      <Modal
        visible={selectedUser !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedUser(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.avatarWrapper}>
              <Image
                source={
                  selectedUser?.avatar_url
                    ? { uri: selectedUser.avatar_url }
                    : require('../assets/images/avatar-placeholder.png')
                }
                style={styles.modalAvatar}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.tooltipName}>
              {selectedUser?.name || selectedUser?.login}
            </Text>
            <Text style={styles.tooltipBio}>
              {selectedUser?.bio || 'No bio available'}
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="View Profile"
                onPress={() => {
                  if (selectedUser) {
                    navigation.navigate('GitHubProfile', {
                      username: selectedUser.login,
                    });
                    setSelectedUser(null);
                  }
                }}
              />
              <Button
                title="Close"
                onPress={() => setSelectedUser(null)}
                color="gray"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 5,
    elevation: 5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    backgroundColor: 'red',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  tooltipName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: 'black',
  },
  tooltipBio: {
    fontSize: 13,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalButtons: {
    width: '100%',
    gap: 10,
  },
  markerAvatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  markerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default MapScreen;

















