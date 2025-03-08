import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { getStoreById } from '~/lib/data/stores';
import { Product, Store } from '~/lib/types';
import ProductCard from '~/components/products/ProductCard';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function StoreScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const storeData = getStoreById(id.toString());
      if (storeData) {
        setStore(storeData);
        setFilteredProducts(storeData.products);
        if (storeData.categories.length > 0) {
          setSelectedCategory(storeData.categories[0]);
        }
      }
    }
  }, [id]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (store) {
      if (category === 'All') {
        setFilteredProducts(store.products);
      } else {
        setFilteredProducts(
          store.products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
          )
        );
      }
    }
  };

  if (!store) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading store...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Store Header with Image */}
      <View className="relative">
        <Image source={{ uri: store.image }} className="h-56 w-full" resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute bottom-0 left-0 right-0 h-32 justify-end p-4"
        />
        <TouchableOpacity
          className="absolute left-4 top-12 rounded-full bg-white p-2"
          onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2f6f39" />
        </TouchableOpacity>
        <View className="absolute bottom-4 left-4 right-4">
          <Text className="text-2xl font-bold text-white">{store.name}</Text>
          <View className="mt-1 flex-row items-center">
            <Ionicons name="location" size={16} color="white" />
            <Text className="ml-1 text-sm text-white">
              {store.address}, {store.city}
            </Text>
          </View>
        </View>
      </View>

      {/* Store Info */}
      <View className="flex-row items-center justify-between bg-white p-4">
        <View className="items-center">
          <View className="flex-row items-center">
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text className="ml-1 font-semibold">{store.rating}</Text>
          </View>
          <Text className="text-xs text-gray-500">Rating</Text>
        </View>

        <View className="items-center">
          <Text className="font-semibold">{store.deliveryTime}</Text>
          <Text className="text-xs text-gray-500">Delivery Time</Text>
        </View>

        <View className="items-center">
          <Text className="font-semibold">${store.deliveryFee}</Text>
          <Text className="text-xs text-gray-500">Delivery Fee</Text>
        </View>

        <TouchableOpacity className="flex-row items-center rounded-full bg-[#e4fde1] px-3 py-1">
          <Feather name="phone" size={14} color="#2f6f39" />
          <Text className="ml-1 text-sm font-medium text-[#2f6f39]">Call</Text>
        </TouchableOpacity>
      </View>

      {/* Store Description */}
      <View className="mt-2 bg-white p-4">
        <Text className="text-base text-gray-700">{store.description}</Text>
      </View>

      {/* Categories */}
      <View className="mt-2 bg-white">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-3"
          contentContainerStyle={{ paddingHorizontal: 16 }}>
          <TouchableOpacity
            className={`mr-3 rounded-full px-4 py-2 ${
              selectedCategory === 'All' ? 'bg-[#2f6f39]' : 'bg-gray-100'
            }`}
            onPress={() => handleCategorySelect('All')}>
            <Text
              className={`font-medium ${
                selectedCategory === 'All' ? 'text-white' : 'text-gray-800'
              }`}>
              All
            </Text>
          </TouchableOpacity>

          {store.categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-3 rounded-full px-4 py-2 ${
                selectedCategory === category ? 'bg-[#2f6f39]' : 'bg-gray-100'
              }`}
              onPress={() => handleCategorySelect(category)}>
              <Text
                className={`font-medium ${
                  selectedCategory === category ? 'text-white' : 'text-gray-800'
                }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products */}
      <View className="flex-1 p-4">
        <Text className="mb-3 text-lg font-semibold">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </Text>

        {filteredProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">No products in this category</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInDown.delay(index * 100)} className="mb-4">
                <ProductCard product={item} />
              </Animated.View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
