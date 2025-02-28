import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList() {
  const product = [
    {
      id: '1',
      name: 'Apple',
      weight: '1kg',
      price: 5,
      image: 'https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg',
    },
    {
      id: '2',
      name: 'Banana',
      weight: '1kg',
      price: 3,
      image: 'https://clipart-library.com/image_gallery2/Banana.png',
    },
    {
      id: '3',
      name: 'Orange',
      weight: '1kg',
      price: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRufcdr9qZyUcOURpoYKh0CKbdNv7dYpW0Zgw&s',
    },
  ];
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl">Top Products</Text>
        <Text className="text-sm text-lime-500">See all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 py-3">
          {product.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
