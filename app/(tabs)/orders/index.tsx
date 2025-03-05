import { View, Text, SafeAreaView, SectionList, Image } from 'react-native';
import React from 'react';
import HeaderView from '~/components/layout/Header';
import data from '~/lib/products.json';
import { currencyFormatter } from '~/lib/helper';

export default function OrdersScreen() {
  const orders = [
    {
      title: 'Active Orders',
      data: [
        {
          id: '1',
          orderNo: '#2312',
          status: 'In Progress',
          items: 3,
          total: 45.99,
          date: 'Today, 10:30 AM',
        },
      ],
    },
    {
      title: 'Past Orders',
      data: [
        {
          id: '2',
          orderNo: '#2311',
          status: 'Delivered',
          items: 5,
          total: 89.99,
          date: 'Yesterday, 2:30 PM',
        },
        {
          id: '3',
          orderNo: '#2310',
          status: 'Delivered',
          items: 2,
          total: 23.5,
          date: '22 Jan, 11:30 AM',
        },
      ],
    },
  ];

  const renderOrder = ({ item }) => (
    <View className="mb-3 rounded-xl border border-gray-200 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-semibold">{item.orderNo}</Text>
          <View
            className={`rounded-full ${
              item.status === 'In Progress' ? 'bg-lime-200' : 'bg-gray-100'
            } px-3 py-1`}>
            <Text className="text-xs font-medium">{item.status}</Text>
          </View>
        </View>
        <Text className="text-lg font-semibold">{currencyFormatter(item.total)}</Text>
      </View>

      <View className="mt-2 flex-row items-center justify-between border-t border-gray-100 pt-2">
        <Text className="text-gray-600">{item.items} items</Text>
        <Text className="text-gray-600">{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#fffffc]">
      <View className="flex-1 p-4">
        <HeaderView isDelivery={false} title="Orders" />
        <SectionList
          sections={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="mb-3 mt-6 text-xl font-semibold">{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
          className="mt-4"
        />
      </View>
    </SafeAreaView>
  );
}
