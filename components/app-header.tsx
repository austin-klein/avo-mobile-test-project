import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
  },
  logo: {
    width: 40,
    height: 40,
  },
  connectButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.primary.lighter,
    backgroundColor: Colors.primary.light,
  },
  connectButtonText: {
    color: Colors.primary.main,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 0.3,
  },
});
