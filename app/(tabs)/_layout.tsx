import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2f6f39',
        tabBarInactiveTintColor: '#444',
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#f9fbf5',
        },
        headerStyle: {
          backgroundColor: '#f8f8f8',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categories',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="layers-search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome6 name="boxes-stacked" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(protected)"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="store/index"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="store/[storeId]"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
