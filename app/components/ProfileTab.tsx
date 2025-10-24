import { ThemedText } from '@/components/themed-text';
import { Agent } from '@/types/types';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';
import { CommonStyles } from '@/constants/commonStyles';

interface ProfileTabProps {
  onBuyPress: () => void;
  agent: Agent;
  onProtectionLevelChange?: (level: string) => void;
}

type ProtectionLevel = 'degen' | 'moderate' | 'guarded';

export function ProfileTab({ onBuyPress, agent, onProtectionLevelChange }: ProfileTabProps) {
  const [selectedProtection, setSelectedProtection] = useState<ProtectionLevel>(
    agent.protectionLevel[0].toLowerCase() as ProtectionLevel
  );

  const handleProtectionChange = (level: ProtectionLevel) => {
    setSelectedProtection(level);
    onProtectionLevelChange?.(level.charAt(0).toUpperCase() + level.slice(1));
  };

  return (
    <View style={styles.tabContent}>
      {/* Wallet Safety Meter */}
      <View style={styles.safetySection}>
        <View style={styles.safetyHeader}>
          <ThemedText style={styles.safetyTitle}>Wallet Safety Meter:</ThemedText>
          <ThemedText style={styles.safetyScore}>100/100</ThemedText>
        </View>
        <View style={styles.safetyMeterContainer}>
          <View style={styles.safetyMeterLabel}>
            <View style={styles.safetyIconBadge}>
              <ThemedText style={styles.safetyCheckmark}>✓</ThemedText>
            </View>
            <ThemedText style={styles.safetyMeterText}>VERY HIGH</ThemedText>
          </View>
        </View>
        <View style={styles.safetyGradientBar} />
      </View>

      {/* Trading Protection Level */}
      <View style={styles.protectionSection}>
        <ThemedText style={styles.protectionTitle}>
          Trading Protection Level{' '}
          <ThemedText style={styles.protectionSubtitle}>(applied by Avo)</ThemedText>
        </ThemedText>

        <View style={styles.protectionGrid}>
          {agent.protectionLevel.map((level) => (
            <Pressable
              key={level}
              style={[
                styles.protectionButton,
                selectedProtection === level.toLowerCase() && styles.protectionButtonActive,
              ]}
              onPress={() => handleProtectionChange(level.toLowerCase() as ProtectionLevel)}>
              <View
                style={[
                  styles.protectionRadio,
                  selectedProtection === level.toLowerCase() && styles.protectionRadioActive,
                ]}>
                {selectedProtection === level.toLowerCase() && (
                  <View style={styles.protectionRadioDot} />
                )}
              </View>
              <ThemedText style={styles.protectionButtonText}>{level}</ThemedText>
            </Pressable>
          ))}
        </View>

        <ThemedText style={styles.protectionDescription}>
          High risk, high reward with minimal protections
        </ThemedText>
      </View>

      {/* Protection Settings Cards */}
      <View style={styles.settingsSection}>
        <ThemedText style={styles.settingsTitle}>
          {selectedProtection.charAt(0).toUpperCase() + selectedProtection.slice(1)} Protection
          Settings:
        </ThemedText>

        <View style={styles.settingCard}>
          <View style={styles.settingCardContent}>
            <View style={styles.settingCardLeft}>
              <ThemedText style={styles.settingLabel}>Min. Market Cap</ThemedText>
              <ThemedText style={styles.settingRequired}>Min. Required:</ThemedText>
            </View>
            <ThemedText style={styles.settingValue}>$10,000</ThemedText>
          </View>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingCardContent}>
            <View style={styles.settingCardLeft}>
              <ThemedText style={styles.settingLabel}>Min. Liquidity</ThemedText>
              <ThemedText style={styles.settingRequired}>Min. Required:</ThemedText>
            </View>
            <ThemedText style={styles.settingValue}>$5,000</ThemedText>
          </View>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingCardContent}>
            <View style={styles.settingCardLeft}>
              <ThemedText style={styles.settingLabel}>Min. 24h Volume</ThemedText>
              <ThemedText style={styles.settingRequired}>Min. Required:</ThemedText>
            </View>
            <ThemedText style={styles.settingValue}>$5,000</ThemedText>
          </View>
        </View>
      </View>

      {/* Performance Stats */}
      <View style={styles.performanceSection}>
        <View style={styles.performanceRow}>
          <View style={styles.performanceItem}>
            <ThemedText style={styles.performanceLabel}>24 hour</ThemedText>
            <ThemedText style={styles.performanceValue}>-11.36%</ThemedText>
          </View>
          <View style={styles.performanceItem}>
            <ThemedText style={styles.performanceLabel}>7 days</ThemedText>
            <ThemedText style={styles.performanceValue}>-18.57%</ThemedText>
          </View>
          <View style={styles.performanceItem}>
            <ThemedText style={styles.performanceLabel}>30 days</ThemedText>
            <ThemedText style={styles.performanceValue}>-82.96%</ThemedText>
          </View>
        </View>
      </View>

      {/* Buy Button */}
      <Pressable style={styles.buyButton} onPress={onBuyPress}>
        <ThemedText style={styles.buyButtonText}>Buy Agent</ThemedText>
        <ThemedText style={styles.buyButtonArrow}> ›</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  safetySection: {
    marginBottom: SPACING.xxl,
  },
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  safetyTitle: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  safetyScore: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  safetyMeterContainer: {
    marginBottom: SPACING.md,
  },
  safetyMeterLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  safetyIconBadge: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: Colors.status.warning,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyCheckmark: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.neutral.black,
  },
  safetyMeterText: {
    color: Colors.status.success,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
  safetyGradientBar: {
    height: 8,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: Colors.primary.main,
    overflow: 'hidden',
  },
  protectionSection: {
    marginBottom: SPACING.xxl,
    paddingBottom: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
  },
  protectionTitle: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xl,
  },
  protectionSubtitle: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.regular,
  },
  protectionGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  protectionButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
  },
  protectionButtonFull: {
    width: '48%',
  },
  protectionButtonActive: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.lighter,
  },
  protectionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.borders.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  protectionRadioActive: {
    borderColor: Colors.primary.main,
  },
  protectionRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.main,
  },
  protectionButtonText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  protectionDescription: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.regular,
    marginTop: SPACING.md,
  },
  settingsSection: {
    marginBottom: SPACING.xxl,
  },
  settingsTitle: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: SPACING.lg,
  },
  settingCard: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
    marginBottom: SPACING.md,
  },
  settingCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingCardLeft: {
    flex: 1,
    gap: SPACING.xs,
  },
  settingLabel: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  settingValue: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
  },
  settingRequired: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  performanceSection: {
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceItem: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  performanceLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  performanceValue: {
    color: Colors.status.error,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
  },
  buyButton: {
    ...CommonStyles.buttonPrimary,
    borderWidth: 1,
    borderColor: 'rgba(157, 77, 255, 0.3)',
    paddingVertical: SPACING.lg,
  },
  buyButtonText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  buyButtonArrow: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xxl,
  },
});
