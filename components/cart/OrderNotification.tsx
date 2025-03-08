import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useCart } from '~/lib/states/use-cart';
import { currencyFormatter } from '~/lib/helper';
import { MaterialIcons } from '@expo/vector-icons';

export default function OrderNotification() {
  const translateX = useSharedValue(0);
  const router = useRouter();
  const { CartItems } = useCart();

  // Calculate total items and price
  const totalItems = CartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = CartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withSequence(withTiming(-3, { duration: 1000 }), withTiming(3, { duration: 1000 })),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <TouchableOpacity
        onPress={() => router.push('/orders/delivery/342')}
        className="absolute bottom-5 left-0 right-0 z-50 mx-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        activeOpacity={0.9}>
        <View className="flex-row items-center border-b border-gray-50 bg-[#e4fde1] p-3">
          <View className="h-2 w-2 rounded-full bg-lime-500" />
          <Text className="ml-2 font-medium text-[#2f6f39]">Order in progress</Text>
        </View>

        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="rounded-full bg-[#e4fde1] p-2">
                <Animated.View style={animatedStyle}>
                  <Ionicons name="bicycle" size={20} color="#2f6f39" />
                </Animated.View>
              </View>
              <View>
                <Text className="text-sm text-gray-500">Estimated delivery</Text>
                <Text className="text-base font-semibold">15-20 mins</Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-sm text-gray-500">Order #2312</Text>
              <Text className="text-base font-medium text-[#2f6f39]">On the way</Text>
            </View>
          </View>

          <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <Animated.View className="h-full rounded-full bg-lime-400" style={[{ width: '60%' }]} />
          </View>
        </View>
      </TouchableOpacity>

      <View className="absolute bottom-6 left-0 right-0 items-center px-4">
        <TouchableOpacity
          className="w-full flex-row items-center justify-between rounded-2xl bg-[#2f6f39] p-4 shadow-lg"
          onPress={() => router.push('/cart')}>
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white">
              <MaterialIcons name="shopping-cart" size={24} color="#2f6f39" />
            </View>
            <View className="ml-3">
              <Text className="text-sm font-medium text-white">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Text>
              <Text className="text-lg font-bold text-white">{currencyFormatter(totalPrice)}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="mr-2 font-medium text-white">View Cart</Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
