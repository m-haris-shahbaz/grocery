import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Store, Product } from '~/lib/types';
import ProductCard from '~/components/products/ProductCard'; // Using your existing ProductCard

type StorePageProps = {
  store: Store;
};

const { width } = Dimensions.get('window');

const StorePage: React.FC<StorePageProps> = ({ store }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(store.products);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(store.products);
    } else {
      setFilteredProducts(
        store.products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, store.products]);

  // Simple star rating display
  const renderRating = (rating: number) => {
    return (
      <View className="flex-row items-center">
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)} • {Math.floor(Math.random() * 500) + 50} reviews
        </Text>
      </View>
    );
  };

  // Updated renderProductItem to match existing ProductCard's width
  const renderProductItem = ({ item }: { item: Product }) => <ProductCard product={item} />;

  // Render empty state when no products
  const renderEmptyState = () => (
    <View className="mx-4 my-10 items-center justify-center rounded-lg border border-gray-100 p-8">
      <Ionicons name="basket-outline" size={48} color="#ddd" />
      <Text className="mt-3 text-center text-gray-500">No products available in this category</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* StatusBar */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Move everything into the FlatList */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          paddingHorizontal: 8,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={() => (
          <>
            {/* Store Header with Image - now part of the scroll content */}
            <View style={{ height: 220 }} className="relative">
              <Image
                source={{ uri: store.image }}
                style={{
                  height: 220,
                  width: '100%',
                  resizeMode: 'cover',
                }}
              />
              <View className="absolute inset-0 bg-black/40" />

              {/* Back Button */}
              <TouchableOpacity
                onPress={() => router.back()}
                className="absolute left-4 top-12 z-10 rounded-full bg-white/90 p-2">
                <Ionicons name="arrow-back" size={22} color="#000" />
              </TouchableOpacity>

              {/* Store Name Overlay */}
              <View className="absolute bottom-0 left-0 right-0 p-4">
                <Text className="text-2xl font-bold text-white" numberOfLines={1}>
                  {store.name}
                </Text>
              </View>
            </View>

            {/* Store Info Section */}
            <View className="mx-4 -mt-4 mb-4 rounded-t-xl border border-gray-100 bg-white p-5">
              {renderRating(store.rating)}

              <View className="mt-3 flex-row flex-wrap items-center gap-y-2">
                <View className="mr-4 flex-row items-center">
                  <Ionicons name="location-outline" size={16} color="#2f6f39" />
                  <Text className="ml-1 text-sm text-gray-600">
                    {store.address}, {store.city}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="call-outline" size={16} color="#2f6f39" />
                  <Text className="ml-1 text-sm text-gray-600">{store.phone}</Text>
                </View>
              </View>

              {/* Action buttons */}
              <View className="mt-4 flex-row border-t border-gray-100 pt-4">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="information-circle-outline" size={18} color="#2f6f39" />
                  <Text className="ml-1 text-sm font-medium text-gray-700">Info</Text>
                </TouchableOpacity>
                <View className="h-full w-px bg-gray-100" />
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <MaterialIcons name="directions" size={18} color="#2f6f39" />
                  <Text className="ml-1 text-sm font-medium text-gray-700">Directions</Text>
                </TouchableOpacity>
                <View className="h-full w-px bg-gray-100" />
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Feather name="share-2" size={18} color="#2f6f39" />
                  <Text className="ml-1 text-sm font-medium text-gray-700">Share</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 py-2"
              contentContainerStyle={{ paddingHorizontal: 16 }}>
              <TouchableOpacity
                onPress={() => setSelectedCategory('all')}
                className={`mr-2 rounded-full border px-4 py-2 ${
                  selectedCategory === 'all'
                    ? 'text-b border-none bg-primary'
                    : 'border-gray-200 bg-white'
                }`}>
                <Text
                  className={`text-sm font-medium ${
                    selectedCategory === 'all' ? 'text-black' : 'text-gray-700'
                  }`}>
                  All Products
                </Text>
              </TouchableOpacity>

              {store.categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCategory(category)}
                  className={`mr-2 rounded-full border px-4 py-2 ${
                    selectedCategory === category
                      ? 'border-none bg-primary'
                      : 'border-gray-200 bg-white'
                  }`}>
                  <Text
                    className={`text-sm font-medium ${
                      selectedCategory === category ? 'text-black' : 'text-gray-700'
                    }`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Products Header */}
            <View className="mb-2 flex-row items-center justify-between px-4">
              <Text className="text-lg font-medium">Products</Text>
              <View className="flex-row items-center rounded-full border border-gray-200 px-3 py-1">
                <Text className="mr-1 text-xs text-gray-700">Sort By</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default StorePage;
