import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons, Ionicons } from '@expo/vector-icons';

export default function Search() {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <TouchableOpacity className="flex-row items-center justify-between rounded-full border border-gray-400 bg-white px-4 py-2.5">
      <TouchableOpacity className="flex-1 flex-row items-center gap-2">
        <EvilIcons name="search" size={28} color="gray" />
        <Text className=" text-lg text-gray-600">Search products</Text>
      </TouchableOpacity>

      <View className="ml-2 flex-row overflow-hidden rounded-full border border-gray-200 bg-gray-50">
        <TouchableOpacity
          onPress={() => setDeliveryMode('delivery')}
          className={`flex-row items-center px-3 py-2 ${
            deliveryMode === 'delivery' ? 'bg-lime-200' : ''
          }`}>
          <Ionicons
            name="bicycle-outline"
            size={14}
            color={deliveryMode === 'delivery' ? 'black' : 'gray'}
          />
          <Text
            className={`ml-1 text-xs font-medium ${
              deliveryMode === 'delivery' ? 'text-black' : 'text-gray-600'
            }`}>
            Delivery
          </Text>
        </TouchableOpacity>
        <View className="w-[1px] bg-gray-200" />
        <TouchableOpacity
          onPress={() => setDeliveryMode('pickup')}
          className={`flex-row items-center px-3 py-2 ${
            deliveryMode === 'pickup' ? 'bg-lime-200' : ''
          }`}>
          <Ionicons
            name="storefront-outline"
            size={14}
            color={deliveryMode === 'pickup' ? 'black' : 'gray'}
          />
          <Text
            className={`ml-1 text-xs font-medium ${
              deliveryMode === 'pickup' ? 'text-black' : 'text-gray-600'
            }`}>
            Pickup
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
