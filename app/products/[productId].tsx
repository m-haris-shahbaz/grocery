import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Entypo, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCart } from '~/lib/states/use-cart';

export default function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const { addProduct } = useCart();
  const product = {
    id: '1',
    name: 'Apple',
    weight: 1000,
    stock: 5,
    category: 'Fruits',
    price: 5,
    image: 'https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg',
  };

  const addToCart = () => {
    addProduct({ ...product, quantity });
    router.push('/cart');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header Section */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between pb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">{product.name}</Text>
          </View>
        </View>
        {/* Image Container */}
        <View className="h-80 bg-gray-50 p-6">
          <Image className="h-full w-full object-contain" source={{ uri: product.image }} />
        </View>

        {/* Product Info */}
        <View className="p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-semibold text-gray-800">{product.name}</Text>
            <TouchableOpacity className="rounded-full border border-gray-200 bg-white p-2">
              <Entypo name="heart-outlined" size={32} color="#2f6f39" />
            </TouchableOpacity>
          </View>

          <Text className="mt-2 text-xl text-gray-500">{product.weight}</Text>

          <View className="mt-4 flex-row items-center">
            <Text className="text-3xl font-bold text-gray-900">AED {product.price}</Text>
            <Text className="ml-2 text-lg text-gray-500">/ kg</Text>
          </View>

          <Text className="mt-6 text-gray-600">
            Fresh and crispy apples picked from the finest orchards. Perfect for healthy snacking
            and cooking.
          </Text>
        </View>

        {/* Bottom Cart Section */}
        <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t border-gray-100 bg-white p-6">
          <View className="w-1/3 flex-row items-center justify-center space-x-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
            <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
              <AntDesign name="minuscircle" size={32} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="w-10 text-center text-xl font-semibold">{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity((prev) => (prev + 1 <= product.stock ? prev + 1 : prev))}>
              <AntDesign name="pluscircle" size={32} color="#2f6f39" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={addToCart}
            className="ml-4 flex-1 items-center rounded-full bg-primary px-6 py-5">
            <Text className="font-semibold text-black">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
