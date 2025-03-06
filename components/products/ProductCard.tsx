import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { weightConverter } from '~/lib/helper';
import { useCart } from '~/lib/states/use-cart';
import { Product } from '~/lib/types';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const onPress = () => {
    router.push({
      pathname: `/products/[productId]`,
      params: { productId: product.id },
    });
  };
  const { name, weight, price, image } = product;
  const { addProduct, CartItems } = useCart();
  const isAdded = CartItems.some((item) => item.id === product.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-4 flex h-[220px] w-[180px] justify-center rounded-xl border border-gray-200 bg-white p-4">
      <Image
        source={{
          uri: image,
        }}
        className="mb-2 h-[120px] w-[120px] self-center"
        resizeMode="contain"
      />
      <View className="flex-row items-center justify-between">
        <View className="gap-y-2">
          <Text>{name}</Text>
          <Text className="text-md text-gray-600">{weightConverter(weight)}</Text>
          <Text className="">AED {price}</Text>
        </View>
        <TouchableOpacity
          {...(isAdded && { disabled: true })}
          onPress={() => addProduct(product)}
          className={`bg-lime-${isAdded ? 200 : 100} h-12 w-12 items-center justify-center rounded-full`}>
          {isAdded ? (
            <MaterialCommunityIcons name="cart-check" size={18} color="black" />
          ) : (
            <Ionicons name="basket" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
