import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';
import { Colors } from '@/constants/colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: FONT_SIZE.lg,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: FONT_SIZE.lg,
    lineHeight: 24,
    fontWeight: FONT_WEIGHT.semibold,
  },
  title: {
    fontSize: FONT_SIZE.heading,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  link: {
    lineHeight: 30,
    fontSize: FONT_SIZE.lg,
    color: Colors.primary.main,
  },
});
