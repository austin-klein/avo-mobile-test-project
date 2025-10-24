import { View, ViewProps } from 'react-native';
import { CommonStyles } from '@/constants/commonStyles';

interface CardLayoutProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function CardLayout({ children, variant = 'default', style, ...props }: CardLayoutProps) {
  const baseStyle = variant === 'compact' ? CommonStyles.cardCompact : CommonStyles.card;

  return (
    <View style={[baseStyle, style]} {...props}>
      {children}
    </View>
  );
}
