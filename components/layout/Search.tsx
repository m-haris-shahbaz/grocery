import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useOrderMethod } from '~/lib/shipping-method';

export default function Search() {
  const { method, setMethod } = useOrderMethod();
  return (
    <View className="flex-row items-center justify-between rounded-full border border-gray-400 bg-white px-4 py-2.5">
      <TouchableOpacity
        className="flex-1 flex-row items-center gap-2"
        onPress={() => router.push('/search')}>
        <EvilIcons name="search" size={28} color="gray" />
        <Text className="text-lg text-gray-600">Search products</Text>
      </TouchableOpacity>

      <View className="ml-2 flex-row overflow-hidden rounded-full border border-gray-200 bg-gray-50">
        <TouchableOpacity
          onPress={() => setMethod('delivery')}
          className={`flex-row items-center px-3 py-2 ${
            method === 'delivery' ? 'bg-lime-200' : ''
          }`}>
          <Ionicons
            name="bicycle-outline"
            size={14}
            color={method === 'delivery' ? 'black' : 'gray'}
          />
          <Text
            className={`ml-1 text-xs font-medium ${
              method === 'delivery' ? 'text-black' : 'text-gray-600'
            }`}>
            Delivery
          </Text>
        </TouchableOpacity>
        <View className="w-[1px] bg-gray-200" />
        <TouchableOpacity
          onPress={() => setMethod('pickup')}
          className={`flex-row items-center px-3 py-2 ${method === 'pickup' ? 'bg-lime-200' : ''}`}>
          <Ionicons
            name="storefront-outline"
            size={14}
            color={method === 'pickup' ? 'black' : 'gray'}
          />
          <Text
            className={`ml-1 text-xs font-medium ${
              method === 'pickup' ? 'text-black' : 'text-gray-600'
            }`}>
            Pickup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
