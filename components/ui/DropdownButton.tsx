import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

export function DropdownButton({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.dropdownButton}>
      <View style={styles.dropdownContent}>
        <ThemedText style={styles.dropdownLabel}>{label}: </ThemedText>
        <ThemedText style={styles.dropdownValue}>{value}</ThemedText>
      </View>
      <ThemedText style={styles.dropdownArrow}>›</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.background.translucent,
  },
  dropdownContent: {
    flexDirection: 'row',
  },
  dropdownLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
  },
  dropdownValue: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  dropdownArrow: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
