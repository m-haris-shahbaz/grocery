import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '~/lib/states/use-cart';
import { useOrderMethod } from '~/lib/states/shipping-method';

type HeaderViewProps = {
  isDelivery: boolean;
  onToggle?: () => void;
  title?: string;
};

export default function HeaderView({ isDelivery, title }: HeaderViewProps) {
  const navigateToCart = () => {
    router.push({
      pathname: '/cart',
      params: { source: 'header' },
    });
  };
  const navigateToWishList = () => {
    router.push({
      pathname: '/wishlist',
      params: { source: 'header' },
    });
  };

  const { CartItems } = useCart();
  const { orderAddress } = useOrderMethod();

  return (
    <View className="flex-row justify-between">
      {isDelivery ? (
        <View className="flex-row items-center gap-4">
          <View className="flex-col justify-center">
            <Text className="text-md text-gray-700">Delivery to:</Text>
            <TouchableOpacity className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold">
                {`${orderAddress.title}, ${orderAddress.building}` || 'Address'}
              </Text>
              <FontAwesome name="angle-down" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text className="text-3xl font-semibold">{title}</Text>
      )}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          onPress={navigateToWishList}
          className="relative items-center self-center">
          <EvilIcons name="heart" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCart} className="relative items-center self-center">
          <EvilIcons name="cart" size={32} color="black" />
          <View className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full bg-lime-200">
            <Text className="text-sm font-bold">{CartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
