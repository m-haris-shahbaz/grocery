import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signOut } from '~/lib/auth/supabase';
import { useAuth } from '~/lib/auth/auth-context';

export default function ProfileHeader() {
  const { setSignedIn, user } = useAuth();

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        onPress: async () => {
          try {
            await signOut();
            setSignedIn(false);
            router.replace('/signin');
          } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View className="flex-row items-center justify-between p-4">
      <Text className="text-xl font-semibold">My Profile</Text>
      <TouchableOpacity onPress={handleSignOut} className="rounded-full p-2">
        <Ionicons name="log-out-outline" size={24} color="#2f6f39" />
      </TouchableOpacity>
    </View>
  );
}
