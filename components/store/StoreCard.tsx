import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Store } from '~/lib/types';

type StoreCardProps = {
  store: Store;
};

export default function StoreCard({ store }: StoreCardProps) {
  const handlePress = () => {
    router.push({
      pathname: `/store/[storeId]`,
      params: { storeId: store.id },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mb-4 w-full rounded-xl border border-gray-100 bg-white p-3">
      <View className="flex-row">
        {/* Store Image */}
        <Image
          source={{ uri: store.image }}
          className="h-24 w-24 rounded-lg"
          style={{ resizeMode: 'cover' }}
        />

        {/* Store Info */}
        <View className="ml-3 flex-1 justify-between py-1">
          <View>
            <Text className="mb-1 text-lg font-semibold">{store.name}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="ml-1 text-sm">{store.rating.toFixed(1)}</Text>
              <Text className="ml-1 text-xs text-gray-500">
                • {Math.floor(Math.random() * 100) + 50} reviews
              </Text>
            </View>
          </View>

          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="text-xs text-gray-500">{store.deliveryTime}</Text>
              <Text className="mx-1 text-xs text-gray-500">•</Text>
              <Text className="text-xs text-gray-500">Min {store.minOrder} AED</Text>
              <Text className="mx-1 text-xs text-gray-500">•</Text>
              <Text className="text-xs text-gray-500">
                {store.deliveryFee > 0 ? `${store.deliveryFee} AED Delivery` : 'Free Delivery'}
              </Text>
            </View>

            <View className="mt-1 flex-row flex-wrap">
              {store.categories.slice(0, 3).map((category, idx) => (
                <React.Fragment key={category}>
                  <Text className="text-xs text-gray-600">{category}</Text>
                  {idx < Math.min(store.categories.length, 3) - 1 && (
                    <Text className="mx-1 text-xs text-gray-400">•</Text>
                  )}
                </React.Fragment>
              ))}
              {store.categories.length > 3 && (
                <Text className="text-xs text-gray-400"> +{store.categories.length - 3} more</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
