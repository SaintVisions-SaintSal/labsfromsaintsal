/* ═══════════════════════════════════════════════════
   LABS FROM SAINTSALÂ — ROOT LAYOUT
   Expo Router · Stack navigation · Dark system
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" backgroundColor="#050508" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050508' }, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
        <Stack.Screen name="(stack)" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
