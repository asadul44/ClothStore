import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { StoreProvider, useStore } from '@/context/StoreContext';

export { AppNavigation, TabBarNavigation } from '@/app/navigation';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const { theme } = useStore();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="favorites" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <RootNavigator />
    </StoreProvider>
  );
}
