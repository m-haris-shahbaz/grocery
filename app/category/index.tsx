import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CategoriesScreen() {
  const router = useRouter();

  // Main categories
  const mainCategories = [
    { id: '1', name: 'Fruits', icon: '🍎', color: '#FADBD8' },
    { id: '2', name: 'Vegetables', icon: '🥦', color: '#D5F5E3' },
    { id: '3', name: 'Dairy', icon: '🥛', color: '#FDEBD0' },
    { id: '4', name: 'Bakery', icon: '🍞', color: '#FCF3CF' },
    { id: '5', name: 'Meat', icon: '🥩', color: '#F5B7B1' },
    { id: '6', name: 'Frozen', icon: '🧊', color: '#D6EAF8' },
    { id: '7', name: 'Drinks', icon: '🥤', color: '#D4E6F1' },
    { id: '8', name: 'Snacks', icon: '🍫', color: '#E8DAEF' },
  ];

  // More specific categories
  const subCategories = [
    {
      title: 'Pantry Essentials',
      items: [
        { id: '9', name: 'Breakfast', icon: '🥐', color: '#F9E79F' },
        { id: '10', name: 'Pasta', icon: '🍝', color: '#F5CBA7' },
        { id: '11', name: 'Rice', icon: '🍚', color: '#F7F9F9' },
        { id: '12', name: 'Canned Goods', icon: '🥫', color: '#A9CCE3' },
      ],
    },
    {
      title: 'Proteins',
      items: [
        { id: '13', name: 'Seafood', icon: '🦐', color: '#AED6F1' },
        { id: '14', name: 'Eggs', icon: '🥚', color: '#F9E79F' },
        { id: '15', name: 'Tofu', icon: '🧊', color: '#FDEBD0' },
        { id: '16', name: 'Poultry', icon: '🍗', color: '#F5CBA7' },
      ],
    },
    {
      title: 'Cooking & Baking',
      items: [
        { id: '17', name: 'Condiments', icon: '🧂', color: '#D7BDE2' },
        { id: '18', name: 'Herbs', icon: '🌿', color: '#A3E4D7' },
        { id: '19', name: 'Oils', icon: '🫙', color: '#F9E79F' },
        { id: '20', name: 'Spices', icon: '🌶️', color: '#F5B7B1' },
      ],
    },
    {
      title: 'Health & Wellness',
      items: [
        { id: '21', name: 'Health Foods', icon: '🥗', color: '#A2D9CE' },
        { id: '22', name: 'Vitamins', icon: '💊', color: '#D7BDE2' },
        { id: '23', name: 'Supplements', icon: '🧴', color: '#AED6F1' },
        { id: '24', name: 'Organic', icon: '🌱', color: '#ABEBC6' },
      ],
    },
  ];

  const navigateToCategory = (id: string, name: string) => {
    router.push({
      pathname: '/category/[id]',
      params: { id, name },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center pb-4">
            <TouchableOpacity
              className="mr-3 rounded-full bg-white p-2"
              onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">All Categories</Text>
          </View>

          {/* Main Categories */}
          <Text className="mb-3 text-lg font-semibold text-gray-900">Main Categories</Text>
          <View className="flex-row flex-wrap justify-between">
            {mainCategories.map((category, index) => (
              <Animated.View
                entering={FadeInDown.delay(index * 100)}
                key={category.id}
                style={{ width: '23%', marginBottom: 16 }}>
                <TouchableOpacity
                  onPress={() => navigateToCategory(category.id, category.name)}
                  className="items-center">
                  <View
                    style={{ backgroundColor: category.color }}
                    className="h-20 w-20 items-center justify-center rounded-full">
                    <Text className="text-3xl">{category.icon}</Text>
                  </View>
                  <Text className="mt-2 text-center font-medium">{category.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Horizontal Line */}
          <View className="my-6 h-[1px] w-full bg-gray-200" />

          {/* Sub Categories */}
          {subCategories.map((section, sectionIndex) => (
            <Animated.View
              entering={FadeInDown.delay(sectionIndex * 150)}
              key={section.title}
              className="mb-8">
              <Text className="mb-3 text-lg font-semibold text-gray-900">{section.title}</Text>
              <View className="flex-row flex-wrap justify-between">
                {section.items.map((category, index) => (
                  <TouchableOpacity
                    key={category.id}
                    style={{ width: '48%', marginBottom: 16 }}
                    onPress={() => navigateToCategory(category.id, category.name)}
                    className="flex-row items-center rounded-xl border border-gray-100 bg-white p-3">
                    <View
                      style={{ backgroundColor: category.color }}
                      className="mr-3 h-12 w-12 items-center justify-center rounded-full">
                      <Text className="text-2xl">{category.icon}</Text>
                    </View>
                    <Text className="flex-1 font-medium">{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
