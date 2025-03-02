import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function DeliveryScreen() {
  const { deliveryId } = useLocalSearchParams<{ deliveryId: string }>();
  const [orderStatus] = useState<'preparing' | 'ready' | 'picked' | 'delivering'>('delivering');

  const steps = [
    {
      title: 'Preparing',
      icon: 'food-fork-drink',
      status: 'preparing',
      completed: ['preparing', 'ready', 'picked', 'delivering'].includes(orderStatus),
    },
    {
      title: 'Ready for pickup',
      icon: 'shopping',
      status: 'ready',
      completed: ['ready', 'picked', 'delivering'].includes(orderStatus),
    },
    {
      title: 'Picked by rider',
      icon: 'bicycle',
      status: 'picked',
      completed: ['picked', 'delivering'].includes(orderStatus),
    },
    {
      title: 'On the way',
      icon: 'map-marker-radius',
      status: 'delivering',
      completed: ['delivering'].includes(orderStatus),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="border-b border-gray-100 p-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              className="rounded-full bg-gray-50 p-2"
              onPress={() => router.push('/orders')}>
              <Ionicons name="chevron-back" size={24} color="#2f6f39" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-gray-900">Order #{deliveryId}</Text>
          </View>
        </View>

        {/* Map View */}
        <View className="h-64 bg-gray-100">
          <MapView
            style={{ flex: 1 }}
            mapType="standard"
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton
            initialRegion={{
              latitude: 24.3245, // Center point of Al Shawamekh
              longitude: 55.5792,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}>
            <Marker
              coordinate={{ latitude: 24.3245, longitude: 54.5792 }}
              title="Home"
              description="My house in Al Shawamekh"
            />

            {/* Grocery Marker */}
            <Marker
              coordinate={{ latitude: 24.326, longitude: 54.5805 }}
              title="Grocery Store"
              description="Nearby grocery store"
            />
          </MapView>
        </View>

        {/* Order Timeline */}
        <View className="flex-1 p-4">
          <View className="space-y-6">
            {steps.map((step, index) => (
              <View key={step.status} className="flex-row items-start">
                <View className="items-center">
                  <View
                    className={`rounded-full p-2 ${
                      step.completed ? 'bg-primary text-black' : 'bg-gray-200'
                    }`}>
                    <MaterialCommunityIcons
                      name={step.icon}
                      size={20}
                      color={step.completed ? 'black' : 'gray'}
                    />
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      className={`h-12 w-[2px] ${step.completed ? 'bg-primary' : 'bg-gray-200'}`}
                    />
                  )}
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-lg font-medium text-gray-900">{step.title}</Text>
                  {step.status === orderStatus && (
                    <Text className="mt-1 text-sm text-gray-500">
                      {step.status === 'delivering'
                        ? 'Estimated delivery in 15 mins'
                        : 'In progress'}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Rider Info */}
        {orderStatus === 'delivering' && (
          <View className="border-t border-gray-100 p-4">
            <View className="flex-row items-center justify-between rounded-xl bg-gray-50 p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 rounded-full bg-gray-200" />
                <View>
                  <Text className="font-medium">John Doe</Text>
                  <Text className="text-gray-500">Your Rider</Text>
                </View>
              </View>
              <TouchableOpacity
                className="rounded-full bg-lime-500 p-3"
                onPress={() => {
                  /* Add call functionality */
                }}>
                <Ionicons name="call" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
