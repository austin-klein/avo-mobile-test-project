import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppHeader } from '@/components/app-header';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          {/* Background GIF - covers entire screen */}
          <Image
            source={{
              uri: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODdmdjI3NHpidG0wdW10Z2NlZGxsYm04eGIwemR5dzZpODk0cGV4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VXhUTVzvNmlRm/giphy.gif',
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
          {/* Content on top of background */}
          <View style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <AppHeader />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
              }}>
              <Stack.Screen name='(tabs)' />
              <Stack.Screen name='agent-detail' options={{ presentation: 'card' }} />
              <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
            </Stack>
          </View>
        </View>
        <StatusBar style='auto' />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
