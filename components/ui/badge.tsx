import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors, ColorMap } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

type BadgeType = 'success' | 'error' | 'warning' | 'info' | 'risk';

interface BadgeProps {
  type?: BadgeType;
  label: string;
  textColor?: string;
  backgroundColor?: string;
  customRiskLevel?: 'Low Risk' | 'Medium Risk' | 'High Risk';
}

export function Badge({
  type = 'info',
  label,
  textColor,
  backgroundColor,
  customRiskLevel,
}: BadgeProps) {
  let bgColor = backgroundColor;
  let txtColor = textColor;

  if (customRiskLevel) {
    const riskColors = ColorMap[customRiskLevel];
    bgColor = riskColors.background;
    txtColor = riskColors.color;
  } else {
    switch (type) {
      case 'success':
        bgColor = Colors.status.success_light;
        txtColor = Colors.status.success;
        break;
      case 'error':
        bgColor = 'rgba(255, 87, 87, 0.15)';
        txtColor = Colors.status.error;
        break;
      case 'warning':
        bgColor = 'rgba(255, 215, 0, 0.15)';
        txtColor = Colors.status.warning;
        break;
      case 'info':
      default:
        bgColor = Colors.primary.light;
        txtColor = Colors.primary.main;
    }
  }

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <ThemedText style={[styles.badgeText, { color: txtColor }]}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
});
