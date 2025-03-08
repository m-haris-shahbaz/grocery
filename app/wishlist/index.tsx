import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCart } from '~/lib/states/use-cart';
import { currencyFormatter, weightConverter } from '~/lib/helper';
import { Product } from '~/lib/types';

export default function WishlistScreen() {
  const { WishListItems, removefromWishList, addProduct } = useCart();

  const handleAddToCart = (product: Product) => {
    addProduct(product);
    // Optional: Show a toast or feedback that item was added to cart
  };

  const renderWishlistItem = (item: Product, index: number) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      key={item.id}
      className="mb-4 flex-row items-center rounded-2xl border border-gray-200 bg-white p-4">
      <View className="relative h-24 w-24">
        <Image
          source={{ uri: item.image }}
          className="h-full w-full rounded-xl"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 px-4">
        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-500">{weightConverter(item.weight)}</Text>
        <Text className="mt-1 text-lg font-bold text-[#2f6f39]">
          {currencyFormatter(item.price)}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() => removefromWishList(item.id)}
          className="rounded-full bg-gray-100 p-2">
          <MaterialIcons name="delete-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          className="rounded-full bg-primary p-2">
          <MaterialIcons name="shopping-cart" size={20} color="#2f6f39" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between pb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">My Wishlist</Text>
          </View>
        </View>

        {/* Wishlist Items */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {WishListItems.length === 0 ? (
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-lg text-gray-500">Your wishlist is empty</Text>
            </View>
          ) : (
            WishListItems.map((item, index) => renderWishlistItem(item, index))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
