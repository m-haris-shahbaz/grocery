import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderView from '~/components/layout/Header';
import Search from '~/components/layout/Search';
import Tabs from '~/components/layout/Tabs';
import ProductList from '~/components/products/ProductList';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-[#e4fde1]">
      <View className="h-[200px] gap-y-6 p-4">
        <HeaderView />
        <Search />
        <Tabs />
      </View>
      <ScrollView className="min-h-full flex-1 bg-[#fffffc] p-4">
        <ProductList />
      </ScrollView>
    </SafeAreaView>
  );
}
