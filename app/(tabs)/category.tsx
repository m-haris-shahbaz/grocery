import { View, Text, SafeAreaView, FlatList, Image } from 'react-native';
import React from 'react';
import HeaderView from '~/components/layout/Header';
import { EvilIcons } from '@expo/vector-icons';

type CategoryItem = {
  id: string;
  name: string;
  image: string;
};

export default function CategoryScreen() {
  const categories = [
    {
      id: '1',
      name: 'Groceries',
      image: 'https://cdn-icons-png.flaticon.com/512/3724/3724788.png',
    },
    {
      id: '2',
      name: 'Fresh Fruits',
      image: 'https://cdn-icons-png.flaticon.com/512/3194/3194766.png',
    },
    {
      id: '3',
      name: 'Beverages',
      image: 'https://cdn-icons-png.flaticon.com/512/3081/3081904.png',
    },
    {
      id: '4',
      name: 'Bakery',
      image: 'https://cdn-icons-png.flaticon.com/512/3081/3081932.png',
    },
    {
      id: '5',
      name: 'Dairy',
      image: 'https://cdn-icons-png.flaticon.com/512/3082/3082211.png',
    },
    {
      id: '6',
      name: 'Snacks',
      image: 'https://cdn-icons-png.flaticon.com/512/2553/2553651.png',
    },
  ];

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <View className="mb-4 w-[48%] items-center rounded-2xl border border-gray-200 bg-white p-4">
      <Image source={{ uri: item.image }} className="h-24 w-24" resizeMode="contain" />
      <Text className="mt-2 text-base font-semibold text-gray-800">{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#fffffc]">
      <View className="flex-1 gap-y-4 p-4">
        <HeaderView isDelivery={false} title="Categories" />

        <View className="flex-row items-center rounded-full border border-gray-300 px-4 py-3">
          <EvilIcons name="search" size={28} color="black" />
          <Text className="ml-2 text-lg text-gray-600">Search categories</Text>
        </View>

        <Text className="text-2xl font-medium text-gray-900">All Categories</Text>

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          className="flex-1"
        />
      </View>
    </SafeAreaView>
  );
}
