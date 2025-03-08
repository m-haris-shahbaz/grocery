import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { getAllStores, searchStores } from '~/lib/data/stores';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Store } from '~/lib/types';

export default function StoresScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState(getAllStores());

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setStores(getAllStores());
    } else {
      setStores(searchStores(text));
    }
  };

  const renderStoreItem = ({ item, index }: { item: Store; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      className="mb-4 overflow-hidden rounded-xl bg-white">
      <TouchableOpacity
        className="overflow-hidden"
        onPress={() => router.push(`/store/${item.id}`)}>
        <View className="relative">
          <Image source={{ uri: item.image }} className="h-32 w-full" resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-16"
          />
        </View>

        <View className="p-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
            <View className="flex-row items-center rounded-full bg-gray-100 px-2 py-1">
              <AntDesign name="star" size={14} color="#FFD700" />
              <Text className="ml-1 text-sm font-medium">{item.rating}</Text>
            </View>
          </View>

          <View className="mt-1 flex-row items-center">
            <Ionicons name="location-outline" size={14} color="gray" />
            <Text className="ml-1 text-sm text-gray-600">
              {item.address}, {item.city}
            </Text>
          </View>

          <View className="mt-3 flex-row justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="gray" />
              <Text className="ml-1 text-xs text-gray-600">{item.deliveryTime}</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="pricetag-outline" size={14} color="gray" />
              <Text className="ml-1 text-xs text-gray-600">${item.deliveryFee} delivery fee</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="cart-outline" size={14} color="gray" />
              <Text className="ml-1 text-xs text-gray-600">${item.minOrder} min</Text>
            </View>
          </View>

          <View className="mt-3 flex-row flex-wrap">
            {item.categories.slice(0, 3).map((category, idx) => (
              <View key={idx} className="mb-1 mr-2 rounded-full bg-[#e4fde1] px-2 py-1">
                <Text className="text-xs text-[#2f6f39]">{category}</Text>
              </View>
            ))}
            {item.categories.length > 3 && (
              <View className="rounded-full bg-gray-100 px-2 py-1">
                <Text className="text-xs text-gray-600">+{item.categories.length - 3}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-4">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              className="mr-3 rounded-full bg-white p-2"
              onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">Grocery Stores</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mb-4 flex-row items-center rounded-full bg-white px-4 py-2">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search for stores..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>

        {/* Stores List */}
        {stores.length === 0 ? (
          <View className="flex-1 items-center justify-center py-10">
            <AntDesign name="shoppingcart" size={64} color="gray" />
            <Text className="mt-4 text-center text-lg text-gray-500">
              No stores found matching "{searchQuery}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={stores}
            keyExtractor={(item) => item.id}
            renderItem={renderStoreItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
