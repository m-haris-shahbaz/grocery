import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Groceries', 'Fresh', 'Drinks', 'Snacks', 'Household', 'Bakery'];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="rounded-t-3xl bg-white px-2">
        <View className="flex-row gap-2 py-3">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 ${
                activeTab === tab ? 'bg-lime-200' : 'bg-gray-100'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab ? 'text-black' : 'text-gray-600'
                }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
