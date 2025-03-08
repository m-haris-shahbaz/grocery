import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import OrderNotification from '~/components/cart/OrderNotification';
import HeaderView from '~/components/layout/Header';
import Search from '~/components/layout/Search';
import Tabs from '~/components/layout/Tabs';
import ProductList from '~/components/products/ProductList';
import { useCart } from '~/lib/states/use-cart';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { stores } from '~/lib/data/stores';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();
  const { WishListItems, CartItems } = useCart();

  const promotions = [
    {
      id: '1',
      title: 'Fresh Fruits & Vegetables',
      description: 'Get 20% off on your first order',
      image:
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1170&auto=format&fit=crop',
      color: '#FFD580',
    },
    {
      id: '2',
      title: 'Organic Products',
      description: 'Shop sustainable products',
      image:
        'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?q=80&w=1470&auto=format&fit=crop',
      color: '#D4F1F9',
    },
  ];

  /*  const categories = [
    { id: '1', name: 'Fruits', icon: '🍎', color: '#FADBD8' },
    { id: '2', name: 'Vegetables', icon: '🥦', color: '#D5F5E3' },
    { id: '3', name: 'Dairy', icon: '🥛', color: '#FDEBD0' },
    { id: '4', name: 'Bakery', icon: '🍞', color: '#FCF3CF' },
    { id: '5', name: 'Meat', icon: '🥩', color: '#F5B7B1' },
    { id: '6', name: 'Frozen', icon: '🧊', color: '#D6EAF8' },
    { id: '7', name: 'Drinks', icon: '🥤', color: '#D4E6F1' },
    { id: '8', name: 'Snacks', icon: '🍫', color: '#E8DAEF' },
  ]; */

  // More categories for the grid view
  const moreCategories = [
    { id: '9', name: 'Breakfast', icon: '🥐', color: '#F9E79F' },
    { id: '10', name: 'Pasta', icon: '🍝', color: '#F5CBA7' },
    { id: '11', name: 'Rice', icon: '🍚', color: '#F7F9F9' },
    { id: '12', name: 'Seafood', icon: '🦐', color: '#AED6F1' },
    { id: '13', name: 'Condiments', icon: '🧂', color: '#D7BDE2' },
    { id: '14', name: 'Canned Goods', icon: '🥫', color: '#A9CCE3' },
    { id: '15', name: 'Herbs', icon: '🌿', color: '#A3E4D7' },
    { id: '16', name: 'Health Foods', icon: '🥗', color: '#A2D9CE' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#e4fde1]">
      <View className="h-[135px] gap-y-6 p-4">
        <HeaderView isDelivery={true} />
        <Search />
      </View>
      <ScrollView className="min-h-full flex-1 bg-[#fffffc]" showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        {/*   <View className="flex-row justify-between bg-white px-4 py-4">
          <TouchableOpacity className="items-center" onPress={() => router.push('/wishlist')}>
            <View className="relative">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-[#e4fde1]">
                <AntDesign name="heart" size={22} color="#2f6f39" />
              </View>
              {WishListItems.length > 0 && (
                <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-[#ff4444]">
                  <Text className="text-xs font-bold text-white">{WishListItems.length}</Text>
                </View>
              )}
            </View>
            <Text className="mt-1 text-xs font-medium">Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center" onPress={() => router.push('/cart')}>
            <View className="relative">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-[#e4fde1]">
                <MaterialIcons name="shopping-cart" size={22} color="#2f6f39" />
              </View>
              {CartItems.length > 0 && (
                <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-[#ff4444]">
                  <Text className="text-xs font-bold text-white">{CartItems.length}</Text>
                </View>
              )}
            </View>
            <Text className="mt-1 text-xs font-medium">Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#e4fde1]">
              <MaterialIcons name="local-offer" size={22} color="#2f6f39" />
            </View>
            <Text className="mt-1 text-xs font-medium">Offers</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#e4fde1]">
              <MaterialIcons name="history" size={22} color="#2f6f39" />
            </View>
            <Text className="mt-1 text-xs font-medium">Orders</Text>
          </TouchableOpacity>
        </View>
 */}
        {/* Promotional Banners */}
        <View className="px-4 py-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-x-4">
            {promotions.map((promo, index) => (
              <Animated.View
                entering={FadeInDown.delay(index * 100)}
                key={promo.id}
                className="mr-3 overflow-hidden rounded-xl"
                style={{ backgroundColor: promo.color }}>
                <TouchableOpacity className="flex-row items-center">
                  <View className="max-w-[60%] p-4">
                    <Text className="text-lg font-bold text-gray-800">{promo.title}</Text>
                    <Text className="mt-1 text-sm text-gray-700">{promo.description}</Text>
                    <View className="mt-3 flex-row items-center rounded-full bg-white px-4 py-2">
                      <Text className="font-medium">Shop Now</Text>
                      <Ionicons name="arrow-forward" size={16} color="black" className="ml-1" />
                    </View>
                  </View>
                  <Image
                    source={{ uri: promo.image }}
                    className="h-28 w-28 rounded-xl"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Featured Stores */}
        <View className="mt-2 px-4 py-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">Featured Stores</Text>
            <TouchableOpacity onPress={() => router.push('/stores')}>
              <Text className="text-sm font-medium text-[#2f6f39]">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
            {stores.map((store, index) => (
              <Animated.View
                entering={FadeInDown.delay(index * 100)}
                key={store.id}
                className="mr-4">
                <TouchableOpacity
                  className="overflow-hidden rounded-xl"
                  onPress={() => router.push(`/store/${store.id}`)}>
                  <View className="relative h-40 w-72">
                    <Image
                      source={{ uri: store.image }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      className="absolute bottom-0 left-0 right-0 h-24 justify-end p-3">
                      <View className="flex-row items-center justify-between">
                        <View>
                          <Text className="text-lg font-bold text-white">{store.name}</Text>
                          <Text className="text-sm text-white">{store.city}</Text>
                        </View>
                        <View className="flex-row items-center rounded-full bg-white px-2 py-1">
                          <AntDesign name="star" size={14} color="#FFD700" />
                          <Text className="ml-1 text-sm font-medium">{store.rating}</Text>
                        </View>
                      </View>
                      <View className="mt-1 flex-row">
                        <Text className="mr-2 text-xs text-white">
                          {store.deliveryTime} • ${store.deliveryFee} fee
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Categories Horizontal Scroll */}
        {/*  <View className="mt-2 px-4 py-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">Categories</Text>
            <TouchableOpacity onPress={() => router.push('/category')}>
              <Text className="text-sm font-medium text-[#2f6f39]">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="mr-4 items-center"
                onPress={() => {
                  router.push({
                    pathname: '/category/[id]',
                    params: { id: category.id, name: category.name },
                  });
                }}>
                <View
                  style={{ backgroundColor: category.color }}
                  className="h-16 w-16 items-center justify-center rounded-full">
                  <Text className="text-2xl">{category.icon}</Text>
                </View>
                <Text className="mt-1 text-sm font-medium">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}

        {/* More Categories Grid View */}
        <View className="mt-4 px-4 py-2">
          <Text className="mb-3 text-lg font-semibold text-gray-900">More Categories</Text>
          <View className="flex-row flex-wrap justify-between">
            {moreCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={{ width: '23%', marginBottom: 12 }}
                onPress={() => {
                  router.push({
                    pathname: '/category/[id]',
                    params: { id: category.id, name: category.name },
                  });
                }}>
                <View
                  style={{ backgroundColor: category.color }}
                  className="h-20 w-full items-center justify-center rounded-lg">
                  <Text className="text-2xl">{category.icon}</Text>
                </View>
                <Text className="mt-1 text-center text-xs font-medium">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tabs for Featured Products */}
        <View className="mt-4">
          <Tabs />
        </View>

        {/* Product List */}
        <View className="mb-20 p-4">
          <ProductList />
        </View>
      </ScrollView>

      {/* Order notification */}
      {CartItems.length > 0 && <OrderNotification />}
    </SafeAreaView>
  );
}
