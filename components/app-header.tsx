import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Image
        source={require('@/assets/images/logo.webp')}
        style={styles.logo}
        contentFit='contain'
      />
      <Pressable style={styles.connectButton}>
        <ThemedText style={styles.connectButtonText}>Connect</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  logo: {
    width: 40,
    height: 40,
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(77, 124, 255, 0.4)',
    backgroundColor: 'rgba(77, 124, 255, 0.15)',
  },
  connectButtonText: {
    color: '#4D7CFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
