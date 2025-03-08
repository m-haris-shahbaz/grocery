import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoreCard from '~/components/store/StoreCard';
import { getAllStores, searchStores } from '~/lib/data/stores';
import { Store } from '~/lib/types';

export default function StoresScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState<Store[]>(getAllStores());

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      setStores(searchStores(text));
    } else {
      setStores(getAllStores());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setStores(getAllStores());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold">Stores</Text>
          <Text className="text-gray-500">Find stores near you</Text>
        </View>

        {/* Search Bar */}
        <View className="mb-4 flex-row items-center rounded-full border border-gray-200 px-4 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="ml-2 flex-1 text-base"
            placeholder="Search stores..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>

        {/* Stores List */}
        <FlatList
          data={stores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StoreCard store={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Ionicons name="sad-outline" size={48} color="lightgray" />
              <Text className="mt-4 text-center text-gray-500">
                No stores found matching your search
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
