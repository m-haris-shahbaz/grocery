import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useCart } from '~/lib/states/use-cart';
import { currencyFormatter, weightConverter } from '~/lib/helper';
import { Product } from '~/lib/types';

// This is just mock data - in a real app, you'd fetch from API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    price: 4.99,
    weight: 1000, // 1kg
    stock: 50,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1569870499705-504209102861?q=80&w=1472&auto=format&fit=crop',
    storeId: 'store1',
    category: 'fruits',
  },
  {
    id: '2',
    name: 'Ripe Bananas',
    price: 2.99,
    weight: 500, // 500g
    stock: 40,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1160&auto=format&fit=crop',
    storeId: 'store1',
    category: 'fruits',
  },
  // Add more products as needed
];

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addProduct, addtoWishList, WishListItems } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // In a real app, this would be an API call based on the ID
  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  // Check if product is in wishlist
  const isInWishlist = product ? WishListItems.some((item) => item.id === product.id) : false;

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading product...</Text>
      </SafeAreaView>
    );
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addProduct({ ...product, quantity });
    router.push('/cart');
  };

  const handleToggleWishlist = () => {
    if (!isInWishlist) {
      addtoWishList(product);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="absolute left-0 right-0 top-12 z-10 flex-row justify-between px-4">
          <TouchableOpacity
            className="rounded-full bg-white p-2 shadow-sm"
            onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#2f6f39" />
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full bg-white p-2 shadow-sm"
            onPress={handleToggleWishlist}>
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={20}
              color={isInWishlist ? '#ff4444' : '#2f6f39'}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image source={{ uri: product.image }} className="h-80 w-full" resizeMode="cover" />

        {/* Product Details */}
        <View className="-mt-10 rounded-t-3xl bg-white p-6">
          <Text className="text-sm uppercase text-gray-500">{product.category}</Text>
          <Text className="mt-2 text-2xl font-bold text-gray-900">{product.name}</Text>

          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-[#2f6f39]">
              {currencyFormatter(product.price)}
            </Text>
            <Text className="text-base text-gray-500">{weightConverter(product.weight)}</Text>
          </View>

          <View className="mt-6 flex-row items-center">
            <View className="mr-4 flex-1">
              <Text className="mb-1 text-base font-medium text-gray-900">Quantity</Text>
              <View className="flex-row items-center rounded-full bg-gray-100">
                <TouchableOpacity className="rounded-full p-2" onPress={decreaseQuantity}>
                  <AntDesign name="minus" size={20} color="#2f6f39" />
                </TouchableOpacity>

                <Text className="flex-1 text-center text-lg font-medium">{quantity}</Text>

                <TouchableOpacity className="rounded-full p-2" onPress={increaseQuantity}>
                  <AntDesign name="plus" size={20} color="#2f6f39" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-1">
              <Text className="mb-1 text-base font-medium text-gray-900">Total Price</Text>
              <Text className="text-xl font-bold text-[#2f6f39]">
                {currencyFormatter(product.price * quantity)}
              </Text>
            </View>
          </View>

          <View className="my-6 h-[1px] w-full bg-gray-200" />

          <Text className="mb-2 text-lg font-medium text-gray-900">About the product</Text>
          <Text className="text-base leading-6 text-gray-600">
            This {product.name} is freshly sourced from local farms. It's organic, nutritious, and
            perfect for your healthy lifestyle.
            {'\n\n'}
            Stock: {product.stock} left
          </Text>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View className="border-t border-gray-200 bg-white p-4">
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-full bg-primary p-4"
          onPress={handleAddToCart}>
          <MaterialIcons name="shopping-cart" size={24} color="#2f6f39" className="mr-2" />
          <Text className="ml-2 text-lg font-bold text-gray-900">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
