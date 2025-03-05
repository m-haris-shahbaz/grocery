import { Link, Stack, Tabs } from 'expo-router';
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2f6f39', // Stays the same
        tabBarInactiveTintColor: '#444', // Slightly darker for better contrast
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#f9fbf5', // A lighter, almost pastel version of #e4fde1
        },
        headerStyle: {
          backgroundColor: '#f8f8f8', // Soft off-white for the header
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
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="store/[storeId]"
        options={{
          title: 'Store',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
