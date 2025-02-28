import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

type HeaderViewProps = {
  isDelivery: boolean;
  onToggle?: () => void;
  title?: string;
};

export default function HeaderView({ isDelivery, onToggle, title }: HeaderViewProps) {
  return (
    <View className="flex-row justify-between">
      {isDelivery ? (
        <View className="flex-row items-center gap-4">
          <View className="h-14 w-14 rounded-full bg-white" />
          <View className="flex-col justify-center">
            <Text className="text-md text-gray-700">Delivery to:</Text>
            <TouchableOpacity className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold">Al Shawamekh 10</Text>
              <FontAwesome name="angle-down" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text className="text-3xl font-semibold">{title}</Text>
      )}
      <TouchableOpacity className="relative items-center self-center">
        <EvilIcons name="cart" size={32} color="black" />
        <View className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full bg-lime-200">
          <Text className="text-sm font-bold">5</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
