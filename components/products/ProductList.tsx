import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';
import data from '~/lib/products.json';

export default function ProductList() {
  const products = data.filter((c) => c.category === 'Fruits');
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl">Top Products</Text>
        <Text className="text-sm text-lime-500">See all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 py-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
