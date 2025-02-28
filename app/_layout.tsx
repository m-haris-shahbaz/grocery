import '../global.css';
import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'products/index',
};

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="products/index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="cart/index" />
    </Stack>
  );
}
