import { Link, Tabs } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#f0fdf4',
        },
        headerStyle: {
          backgroundColor: '#fff',
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
    </Tabs>
  );
}
