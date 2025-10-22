import { ThemedText } from '@/components/themed-text';
import { Agent } from '@/types/types';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface ProfileTabProps {
  onBuyPress: () => void;
  agent: Agent;
}

type ProtectionLevel = 'degen' | 'moderate' | 'guarded';

export function ProfileTab({ onBuyPress, agent }: ProfileTabProps) {
  const [selectedProtection, setSelectedProtection] = useState<ProtectionLevel>(
    agent.protectionLevel[0].toLowerCase() as ProtectionLevel
  );

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
              onPress={() => setSelectedProtection(level.toLowerCase() as ProtectionLevel)}>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  safetySection: {
    marginBottom: 24,
  },
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  safetyTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  safetyScore: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  safetyMeterContainer: {
    marginBottom: 12,
  },
  safetyMeterLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  safetyIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyCheckmark: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  safetyMeterText: {
    color: '#00E5A0',
    fontSize: 14,
    fontWeight: '700',
  },
  safetyGradientBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4D9DFF',
    overflow: 'hidden',
  },
  protectionSection: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  protectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
  },
  protectionSubtitle: {
    color: '#888',
    fontSize: 13,
    fontWeight: '400',
  },
  protectionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  protectionButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  protectionButtonFull: {
    width: '48%',
  },
  protectionButtonActive: {
    backgroundColor: 'rgba(77, 124, 255, 0.2)',
    borderColor: 'rgba(77, 124, 255, 0.4)',
  },
  protectionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  protectionRadioActive: {
    borderColor: '#4D7CFF',
  },
  protectionRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4D7CFF',
  },
  protectionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  protectionDescription: {
    color: '#888',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 12,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 12,
  },
  settingCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingCardLeft: {
    flex: 1,
    gap: 4,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  settingRequired: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  performanceSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceItem: {
    alignItems: 'center',
    gap: 6,
  },
  performanceLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  performanceValue: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '700',
  },
  buyButton: {
    backgroundColor: '#4D7CFF',
    paddingVertical: 18,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(157, 77, 255, 0.3)',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buyButtonArrow: {
    color: '#fff',
    fontSize: 20,
  },
});
