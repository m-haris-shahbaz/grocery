import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useMemo } from 'react';
import { router } from 'expo-router';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCart } from '~/lib/use-cart';
import { currencyFormatter, weightConverter } from '~/lib/helper';
import { Product } from '~/lib/types';

export default function CartScreen() {
  const { CartItems, decreaseQuantity, increaseQuantity, removeAllProducts } = useCart();

  // Calculate totals only when CartItems changes
  const totals = useMemo(() => {
    const subtotal = CartItems.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    const deliveryFee = 2.0;
    const total = subtotal + deliveryFee;

    return {
      subtotal: currencyFormatter(subtotal),
      deliveryFee: currencyFormatter(deliveryFee),
      total: currencyFormatter(total),
    };
  }, [CartItems]);

  // Create handlers that don't cause re-renders
  const handleDecrease = (id: string) => () => decreaseQuantity(id);
  const handleIncrease = (id: string) => () => increaseQuantity(id);

  const renderCartItem = (item: Product, index: number) => (
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
          <Text className="text-xs font-bold text-lime-700">{item.quantity || 1}</Text>
        </View>
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
          onPress={handleDecrease(item.id)}
          className="rounded-full bg-gray-100 p-2">
          <AntDesign name="minus" size={16} color="#2f6f39" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleIncrease(item.id)}
          className="rounded-full bg-gray-100 p-2">
          <AntDesign name="plus" size={16} color="#2f6f39" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 justify-between bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between pb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">Shopping Cart</Text>
          </View>
          <TouchableOpacity className="rounded-full bg-white p-2" onPress={removeAllProducts}>
            <MaterialIcons name="delete-outline" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {CartItems.length === 0 ? (
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-lg text-gray-500">Your cart is empty</Text>
            </View>
          ) : (
            CartItems.map((item, index) => renderCartItem(item, index))
          )}
        </ScrollView>

        {/* Bottom Sheet */}
        {CartItems.length > 0 && (
          <Animated.View entering={FadeInDown} className="mt-auto rounded-3xl  p-4">
            <View className="gap-y-5">
              <TextInput
                placeholder="Enter Promo Code"
                className="rounded-full border border-gray-200 p-4"
              />
              <View className="flex-row items-center justify-between">
                <Text className="text-base text-gray-600">Subtotal</Text>
                <Text className="text-base font-medium">{totals.subtotal}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-base text-gray-600">Delivery Fee</Text>
                <Text className="text-base font-medium">{totals.deliveryFee}</Text>
              </View>
              <View className="h-[1px] w-full bg-gray-300" />
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-gray-900">Total</Text>
                <Text className="text-xl font-bold text-[#2f6f39]">{totals.total}</Text>
              </View>
            </View>

            <TouchableOpacity
              className="mt-6 rounded-full bg-primary py-4"
              onPress={() => router.push('/cart/checkout')}>
              <Text className="text-center text-lg font-semibold text-black">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
