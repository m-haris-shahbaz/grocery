import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import HeaderView from '~/components/layout/Header';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAuth } from '~/lib/auth/auth-context';

export default function ProfileScreen() {
  const { user } = useAuth();
  const menuItems = [
    {
      id: '1',
      title: 'My Addresses',
      icon: <Ionicons name="location-outline" size={24} color="black" />,
    },
    {
      id: '2',
      title: 'Payment Methods',
      icon: <MaterialIcons name="payment" size={24} color="black" />,
    },
    {
      id: '3',
      title: 'Notifications',
      icon: <Ionicons name="notifications-outline" size={24} color="black" />,
    },
    {
      id: '4',
      title: 'Help Center',
      icon: <MaterialIcons name="help-outline" size={24} color="black" />,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#fffffc]">
      <View className="flex-1 p-4">
        <HeaderView isDelivery={false} title="Profile" />

        {/* Wrap ScrollView in a flex-1 View */}
        <View className="flex-1">
          <ScrollView className="mt-4 flex-1">
            {/* Profile Card */}
            <View className="rounded-2xl bg-[#e4fde1] p-4">
              <View className="flex-row items-center gap-4">
                <View className="h-16 w-16 rounded-full bg-white" />
                <View>
                  <Text className="text-xl font-semibold">{user?.user_metadata.full_name}</Text>
                  <Text className="text-gray-600">{user?.email}</Text>
                </View>
              </View>
            </View>

            {/* Menu Items */}
            <View className="mt-10 rounded-2xl border border-gray-200 bg-white p-2">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center justify-between p-4 ${
                    index !== menuItems.length - 1 ? 'border-b border-gray-200' : ''
                  }`}>
                  <View className="flex-row items-center gap-3">
                    {item.icon}
                    <Text className="text-base">{item.title}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="gray" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity className="mt-4 rounded-full border border-gray-200 p-4">
            <Text className="text-center text-base font-medium text-red-500">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
