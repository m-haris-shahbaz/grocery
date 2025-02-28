import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderView from '~/components/layout/Header';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-[#e4fde1]">
      <View className="h-[200px] p-4">
        <HeaderView />
        // Search // Tabs
      </View>
      <ScrollView className="min-h-full flex-1 bg-[#fffffc] p-4">
        <Text>Hi</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
