import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';

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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContent: {
    flexDirection: 'row',
  },
  dropdownLabel: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
