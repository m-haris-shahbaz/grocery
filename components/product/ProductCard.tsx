import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '~/lib/types';

type ProductCardProps = {
  product: Product;
  onPress?: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(1);
    // Additional logic to add to cart
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Pressable
      className="m-1 rounded-xl bg-white p-2 shadow-sm"
      onPress={() => onPress && onPress(product)}>
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="h-32 w-full rounded-lg"
          style={{ resizeMode: 'cover' }}
        />
        {product.stock <= 0 && (
          <View className="absolute inset-0 items-center justify-center rounded-lg bg-black/30">
            <Text className="font-semibold text-white">Out of Stock</Text>
          </View>
        )}
      </View>
      <View className="mt-2">
        <Text className="text-sm text-gray-500">{product.store.name}</Text>
        <Text className="text-base font-medium" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-sm text-gray-600">{product.weight}g</Text>
        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-base font-bold">${product.price.toFixed(2)}</Text>
          {quantity === 0 ? (
            <TouchableOpacity
              className="rounded-full bg-primary p-1"
              onPress={handleAddToCart}
              disabled={product.stock <= 0}>
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center rounded-full bg-gray-100">
              <TouchableOpacity className="rounded-full p-1" onPress={handleDecrease}>
                <Ionicons name="remove" size={18} color="#2f6f39" />
              </TouchableOpacity>
              <Text className="w-6 text-center font-medium">{quantity}</Text>
              <TouchableOpacity
                className="rounded-full p-1"
                onPress={handleIncrease}
                disabled={quantity >= product.stock}>
                <Ionicons name="add" size={18} color="#2f6f39" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;
