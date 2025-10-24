import { Colors, ColorMap } from '@/constants/colors';

export const getRiskColor = (riskLevel: string): string => {
  return ColorMap[riskLevel as keyof typeof ColorMap]?.color || Colors.neutral.gray500;
};

export const getRiskBgColor = (riskLevel: string): string => {
  return ColorMap[riskLevel as keyof typeof ColorMap]?.background || 'rgba(136, 136, 136, 0.15)';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(6)}`;
};

export const getStatusColor = (isPositive: boolean): string => {
  return isPositive ? Colors.status.success : Colors.status.error;
};
