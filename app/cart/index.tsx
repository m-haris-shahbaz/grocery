import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CartScreen() {
  const cartItems = [
    {
      id: '1',
      name: 'Fresh Apples',
      price: 4.99,
      quantity: 2,
      weight: '1kg',
      image:
        'https://www.freepnglogos.com/uploads/apple-png/apple-fruit-png-transparent-images-png-only-19.png',
    },
    // Add more items as needed
  ];

  const renderCartItem = (item: any, index: number) => (
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
        <View className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full bg-lime-100">
          <Text className="text-xs font-bold text-lime-700">{item.quantity}</Text>
        </View>
      </View>

      <View className="flex-1 px-4">
        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-500">{item.weight}</Text>
        <Text className="mt-1 text-lg font-bold text-[#2f6f39]">AED {item.price}</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity className="rounded-full bg-gray-100 p-2">
          <AntDesign name="minus" size={16} color="#2f6f39" />
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-gray-100 p-2">
          <AntDesign name="plus" size={16} color="#2f6f39" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="bg-background flex-1 justify-between">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between pb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">Shopping Cart</Text>
          </View>
          <TouchableOpacity className="rounded-full bg-white p-2">
            <MaterialIcons name="delete-outline" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {cartItems.map((item, index) => renderCartItem(item, index))}
        </ScrollView>

        {/* Bottom Sheet */}
        <Animated.View entering={FadeInDown} className="s mt-auto rounded-3xl p-4">
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-gray-600">Subtotal</Text>
              <Text className="text-base font-medium">AED 9.98</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-gray-600">Delivery Fee</Text>
              <Text className="text-base font-medium">AED 2.00</Text>
            </View>
            <View className="h-[1px] w-full bg-gray-100" />
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-xl font-bold text-[#2f6f39]">AED 11.98</Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-primary mt-6 rounded-full py-4"
            onPress={() => router.push('/cart/checkout')}>
            <Text className="text-center text-lg font-semibold text-black">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
