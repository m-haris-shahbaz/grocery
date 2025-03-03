import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    weight: string;
    price: number;
    image: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const onPress = () => {
    router.push({
      pathname: `/products/[productId]`,
      params: { productId: product.id },
    });
  };
  const { name, weight, price, image } = product;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-4 flex h-[220px] w-[150px] justify-center rounded-xl border border-gray-200 bg-white p-4">
      <Image
        source={{
          uri: image,
        }}
        className="h-[120px] w-[120px] self-center"
        resizeMode="contain"
      />
      <View className="flex-row items-center justify-between">
        <View className="gap-y-2">
          <Text>{name}</Text>
          <Text className="text-md text-gray-600">{weight}</Text>
          <Text className="">AED {price}</Text>
        </View>
        <TouchableOpacity className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-200">
          <Ionicons name="basket" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
