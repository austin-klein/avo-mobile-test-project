import Animated from 'react-native-reanimated';
import { FONT_SIZE, SPACING } from '@/constants/dimensions';

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: FONT_SIZE.xxl,
        lineHeight: 32,
        marginTop: -SPACING.xs,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
