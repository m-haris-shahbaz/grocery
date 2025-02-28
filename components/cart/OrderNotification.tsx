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

export default function OrderNotification() {
  const translateX = useSharedValue(0);

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
    <TouchableOpacity
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
  );
}
