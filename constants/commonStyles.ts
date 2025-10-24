import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { BORDER_RADIUS, CARD, SPACING } from './dimensions';

export const CommonStyles = StyleSheet.create({
  // Cards
  card: {
    borderRadius: CARD.borderRadius,
    padding: CARD.padding,
    borderWidth: 1,
    borderColor: Colors.borders.lighter,
    backgroundColor: Colors.neutral.darkCard,
  },
  cardCompact: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
  },

  // Badges
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  badgeSuccess: {
    backgroundColor: Colors.status.success_light,
  },
  badgeWarning: {
    backgroundColor: Colors.status.warning,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: Colors.primary.main,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonSecondary: {
    backgroundColor: Colors.neutral.darkCardAlt,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.borders.lighter,
    marginVertical: SPACING.lg,
  },

  // Progress Bar
  progressBarContainer: {
    height: 5,
    backgroundColor: Colors.borders.lighter,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2.5,
  },

  // Text
  textXs: {
    fontSize: 11,
    fontWeight: '400',
  },
  textSm: {
    fontSize: 12,
    fontWeight: '500',
  },
  textMd: {
    fontSize: 14,
    fontWeight: '600',
  },
  textLg: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Containers
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
