import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { products } from '~/lib/data/products';
import ProductCard from '~/components/products/ProductCard';
import { Product } from '~/lib/types';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('popular');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Get the category emoji icon based on name
  const getCategoryIcon = () => {
    const icons: Record<string, string> = {
      Fruits: '🍎',
      Vegetables: '🥦',
      Dairy: '🥛',
      Bakery: '🍞',
      Meat: '🥩',
      Frozen: '🧊',
      Drinks: '🥤',
      Snacks: '🍫',
      Breakfast: '🥐',
      Pasta: '🍝',
      Rice: '🍚',
      Seafood: '🦐',
      Condiments: '🧂',
      'Canned Goods': '🥫',
      Herbs: '🌿',
      'Health Foods': '🥗',
    };

    return name && typeof name === 'string' ? icons[name] || '🛒' : '🛒';
  };

  // Simulate getting products by category
  useEffect(() => {
    // In a real app, you'd fetch products by category from an API
    // Here we're just filtering the mock products randomly as an example
    const filtered = products.filter((_, index) => {
      // Just a way to get some products for display - in a real app you'd use proper filtering
      return index % 3 === Number(id) % 3;
    });

    setCategoryProducts(filtered);
  }, [id]);

  const handleSort = (option: string) => {
    setSortOption(option);
    let sorted = [...categoryProducts];

    switch (option) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popular or any other option
        // For popular, we're just using the original order as a placeholder
        // In a real app, you might sort by rating or popularity metric
        break;
    }

    setCategoryProducts(sorted);
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={{ width: '48%', marginBottom: 16 }}>
      <ProductCard product={item} />
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>

            <View className="flex-row items-center"></View>
            <Text className="mr-2 text-2xl">{getCategoryIcon()}</Text>
            <Text className="text-2xl font-semibold text-gray-900">
              {name && typeof name === 'string' ? name : 'Category'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="rounded-full bg-white p-2"
          onPress={() => setIsFilterVisible(!isFilterVisible)}>
          <Feather name="filter" size={20} color="#2f6f39" />
        </TouchableOpacity>
      </View>

      {/* Filter & Sort Options */}
      {isFilterVisible && (
        <Animated.View entering={FadeInDown} className="mb-4 rounded-xl bg-white p-4">
          <Text className="mb-3 text-lg font-semibold">Sort By</Text>

          <View className="flex-row flex-wrap">
            {[
              { id: 'popular', label: 'Popular' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' },
              { id: 'name', label: 'Name' },
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`mb-2 mr-2 rounded-full px-4 py-2 ${
                  sortOption === option.id ? 'bg-[#2f6f39]' : 'bg-gray-100'
                }`}
                onPress={() => handleSort(option.id)}>
                <Text className={`${sortOption === option.id ? 'text-white' : 'text-gray-800'}`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-4 flex-row">
            <TouchableOpacity
              className="mr-2 flex-1 rounded-lg border border-[#2f6f39] py-2"
              onPress={() => setIsFilterVisible(false)}>
              <Text className="text-center font-medium text-[#2f6f39]">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-lg bg-[#2f6f39] py-2"
              onPress={() => setIsFilterVisible(false)}>
              <Text className="text-center font-medium text-white">Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Product Count */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-gray-600">
          {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'} found
        </Text>

        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2 rounded-lg bg-white p-2" onPress={() => {}}>
            <MaterialIcons name="view-module" size={22} color="#2f6f39" />
          </TouchableOpacity>

          <TouchableOpacity className="rounded-lg bg-white p-2" onPress={() => {}}>
            <MaterialIcons name="view-list" size={22} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products */}
      {categoryProducts.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Image
            source={{ uri: 'https://img.icons8.com/pastel-glyph/64/000000/empty-box.png' }}
            className="h-20 w-20 opacity-50"
            resizeMode="contain"
          />
          <Text className="mt-4 text-lg text-gray-500">No products found</Text>
          <TouchableOpacity
            className="mt-4 rounded-full bg-[#2f6f39] px-6 py-2"
            onPress={() => router.back()}>
            <Text className="font-medium text-white">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={categoryProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}
