import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import debounce from 'lodash/debounce';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Auto focus the input when screen opens
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSearch = useCallback(
    debounce((text: string) => {
      if (text.length > 0) {
        setIsLoading(true);
        // Your search logic here
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 300),
    []
  );

  return (
    <SafeAreaView className="bg-background flex-1">
      <View className="flex-1 p-4">
        <View className="flex-row items-center justify-between pb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-full bg-white p-2" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900">Search</Text>
          </View>
        </View>

        <View className="flex-row items-center rounded-full border border-gray-300 px-4 py-2">
          <EvilIcons name="search" size={28} color="black" />
          <TextInput
            ref={inputRef}
            className="ml-2 flex-1 text-lg text-gray-900"
            placeholder="Search products"
            placeholderTextColor="#666"
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              handleSearch(text);
            }}
          />
          {isLoading && <ActivityIndicator color="#2f6f39" />}
        </View>

        {/* Search results can be added here */}
      </View>
    </SafeAreaView>
  );
}
