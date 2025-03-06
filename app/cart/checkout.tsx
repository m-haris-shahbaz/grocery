import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useMemo, useState, useRef } from 'react';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCart } from '~/lib/states/use-cart';
import { currencyFormatter } from '~/lib/helper';
import AddressModal, { AddressModalRef } from '~/components/user/Address';
import { useOrderMethod } from '~/lib/states/shipping-method';
import { Address } from '~/lib/types';

type PaymentMethod = 'card' | 'cash' | 'wallet';
type DeliveryOption = 'standard' | 'express';

export default function CheckoutScreen() {
  const { CartItems, removeAllProducts } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>('standard');
  const { orderAddress, setOrderAddress } = useOrderMethod();

  const addressModalRef = useRef<AddressModalRef>(null);

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = CartItems.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    const deliveryFee = selectedDelivery === 'standard' ? 2.0 : 5.0;
    const discount = 0; // Can be calculated based on promo code
    const total = subtotal + deliveryFee - discount;

    return {
      subtotal,
      deliveryFee,
      discount,
      total,
      subtotalFormatted: currencyFormatter(subtotal),
      deliveryFeeFormatted: currencyFormatter(deliveryFee),
      discountFormatted: currencyFormatter(discount),
      totalFormatted: currencyFormatter(total),
    };
  }, [CartItems, selectedDelivery]);

  const handlePlaceOrder = () => {
    // Process order
    removeAllProducts();
    router.push({
      pathname: '/(tabs)/orders/delivery/[deliveryId]',
      params: { deliveryId: Math.floor(Math.random() * 10000).toString() },
    });
  };

  const handleAddressChange = () => {
    addressModalRef.current?.open();
  };

  const handleSelectAddress = (address: Address) => {
    setOrderAddress(address);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center pb-4">
          <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#2f6f39" />
          </TouchableOpacity>
          <Text className="ml-3 text-2xl font-semibold text-gray-900">Checkout</Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Delivery Address */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-medium text-gray-900">Delivery Address</Text>
              <TouchableOpacity onPress={handleAddressChange}>
                <Text className="font-medium text-lime-600">Change</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-3 flex-row items-center">
              <View className="mr-3 rounded-full bg-lime-100 p-2">
                {orderAddress.type === 'home' ? (
                  <Ionicons name="home-outline" size={20} color="#2f6f39" />
                ) : orderAddress.type === 'work' ? (
                  <MaterialIcons name="work-outline" size={20} color="#2f6f39" />
                ) : (
                  <MaterialIcons name="location-on" size={20} color="#2f6f39" />
                )}
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900">{orderAddress.title}</Text>
                <Text className="text-gray-500">{orderAddress.address}</Text>
                {orderAddress.building && (
                  <Text className="text-gray-500">{orderAddress.building}</Text>
                )}
              </View>
            </View>
          </Animated.View>

          {/* Delivery Options */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <Text className="mb-3 text-lg font-medium text-gray-900">Delivery Options</Text>

            <TouchableOpacity
              className={`mb-3 flex-row items-center rounded-xl border p-3 ${
                selectedDelivery === 'standard' ? 'border-lime-500 bg-lime-50' : 'border-gray-200'
              }`}
              onPress={() => setSelectedDelivery('standard')}>
              <View
                className={`mr-3 rounded-full border-2 p-1 ${
                  selectedDelivery === 'standard' ? 'border-lime-500' : 'border-gray-300'
                }`}>
                {selectedDelivery === 'standard' && (
                  <View className="h-2 w-2 rounded-full bg-lime-500" />
                )}
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900">Standard Delivery</Text>
                <Text className="text-gray-500">Delivery within 30-45 minutes</Text>
              </View>
              <Text className="font-medium text-gray-900">{currencyFormatter(2.0)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center rounded-xl border p-3 ${
                selectedDelivery === 'express' ? 'border-lime-500 bg-lime-50' : 'border-gray-200'
              }`}
              onPress={() => setSelectedDelivery('express')}>
              <View
                className={`mr-3 rounded-full border-2 p-1 ${
                  selectedDelivery === 'express' ? 'border-lime-500' : 'border-gray-300'
                }`}>
                {selectedDelivery === 'express' && (
                  <View className="h-2 w-2 rounded-full bg-lime-500" />
                )}
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900">Express Delivery</Text>
                <Text className="text-gray-500">Delivery within 15-20 minutes</Text>
              </View>
              <Text className="font-medium text-gray-900">{currencyFormatter(5.0)}</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Payment Methods */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <Text className="mb-3 text-lg font-medium text-gray-900">Payment Method</Text>

            <TouchableOpacity
              className={`mb-3 flex-row items-center rounded-xl border p-3 ${
                selectedPayment === 'card' ? 'border-lime-500 bg-lime-50' : 'border-gray-200'
              }`}
              onPress={() => setSelectedPayment('card')}>
              <View
                className={`mr-3 rounded-full border-2 p-1 ${
                  selectedPayment === 'card' ? 'border-lime-500' : 'border-gray-300'
                }`}>
                {selectedPayment === 'card' && (
                  <View className="h-2 w-2 rounded-full bg-lime-500" />
                )}
              </View>
              <MaterialCommunityIcons name="credit-card-outline" size={24} color="#2f6f39" />
              <Text className="ml-2 font-medium text-gray-900">Credit/Debit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`mb-3 flex-row items-center rounded-xl border p-3 ${
                selectedPayment === 'cash' ? 'border-lime-500 bg-lime-50' : 'border-gray-200'
              }`}
              onPress={() => setSelectedPayment('cash')}>
              <View
                className={`mr-3 rounded-full border-2 p-1 ${
                  selectedPayment === 'cash' ? 'border-lime-500' : 'border-gray-300'
                }`}>
                {selectedPayment === 'cash' && (
                  <View className="h-2 w-2 rounded-full bg-lime-500" />
                )}
              </View>
              <MaterialIcons name="payments" size={24} color="#2f6f39" />
              <Text className="ml-2 font-medium text-gray-900">Cash on Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center rounded-xl border p-3 ${
                selectedPayment === 'wallet' ? 'border-lime-500 bg-lime-50' : 'border-gray-200'
              }`}
              onPress={() => setSelectedPayment('wallet')}>
              <View
                className={`mr-3 rounded-full border-2 p-1 ${
                  selectedPayment === 'wallet' ? 'border-lime-500' : 'border-gray-300'
                }`}>
                {selectedPayment === 'wallet' && (
                  <View className="h-2 w-2 rounded-full bg-lime-500" />
                )}
              </View>
              <Ionicons name="wallet-outline" size={24} color="#2f6f39" />
              <Text className="ml-2 font-medium text-gray-900">Digital Wallet</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Order Summary */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <Text className="mb-3 text-lg font-medium text-gray-900">Order Summary</Text>

            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600">Items Total ({CartItems.length})</Text>
                <Text className="font-medium">{totals.subtotalFormatted}</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600">Delivery Fee</Text>
                <Text className="font-medium">{totals.deliveryFeeFormatted}</Text>
              </View>

              {totals.discount > 0 && (
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">Discount</Text>
                  <Text className="font-medium text-green-600">-{totals.discountFormatted}</Text>
                </View>
              )}

              <View className="my-1 h-[1px] w-full bg-gray-100" />

              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-gray-900">Total</Text>
                <Text className="text-xl font-bold text-[#2f6f39]">{totals.totalFormatted}</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Place Order Button */}
        <Animated.View entering={FadeInDown} className="mt-4">
          <TouchableOpacity className="rounded-full bg-primary py-4" onPress={handlePlaceOrder}>
            <Text className="text-center text-lg font-semibold text-black">
              Place Order - {totals.totalFormatted}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Address Modal */}
      <AddressModal
        ref={addressModalRef}
        onSelectAddress={handleSelectAddress}
        selectedAddressId={orderAddress.id}
      />
    </SafeAreaView>
  );
}
