import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TradingModal } from '@/components/trading-modal';
import { Agent } from '@/types/types';
import { bottts, identicon } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, AVATAR, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';
import { CommonStyles } from '@/constants/commonStyles';
import { getStatusColor } from '@/utils/styling';

const ProgressBar = ({ percentage, maxWidth = 80 }: { percentage: number; maxWidth?: number }) => {
  const filledWidth = (percentage / 100) * maxWidth;
  return (
    <View style={[CommonStyles.progressBarContainer, { width: maxWidth }]}>
      <View
        style={[
          CommonStyles.progressBarFill,
          {
            width: filledWidth,
            backgroundColor: Colors.primary.main,
          },
        ]}
      />
    </View>
  );
};

export const AgentCard = ({ agent }: { agent: Agent }) => {
  const router = useRouter();
  const [showTradingModal, setShowTradingModal] = useState(false);

  const handleDetailsPress = () => {
    router.push({
      pathname: '/agent-detail',
      params: { agentId: agent.id },
    });
  };

  const handleBuyPress = () => {
    setShowTradingModal(true);
  };

  const handleCloseModal = () => {
    setShowTradingModal(false);
  };

  return (
    <>
      <ThemedView style={styles.card}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <Pressable style={{ flex: 1 }} onPress={handleDetailsPress}>
              <SvgXml xml={createAvatar(bottts, { seed: agent.name }).toString()} />
            </Pressable>
          </View>
          <View style={styles.headerInfo}>
            <ThemedText type='defaultSemiBold' style={styles.agentName}>
              {agent.name}
            </ThemedText>
            <View
              style={[styles.roleBadge, agent.role === 'KOL Tracker Agent' && styles.roleBadgeKOL]}>
              <ThemedText
                style={[styles.roleText, agent.role === 'KOL Tracker Agent' && styles.roleTextKOL]}>
                {agent.role}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buyButton} onPress={handleBuyPress}>
            <ThemedText style={styles.buyButtonText}>Buy ›</ThemedText>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleDetailsPress}>
            <ThemedText style={styles.secondaryButtonText}>›</ThemedText>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={CommonStyles.divider} />

        {/* Top Positions Section */}
        <View style={styles.positionsSection}>
          <ThemedText style={styles.positionsTitle}>Top Positions</ThemedText>

          {agent.topPositions.map((position, index) => (
            <View key={index} style={styles.positionRow}>
              <View style={styles.symbolContainer}>
                <View style={[styles.symbolIcon]}>
                  <SvgXml xml={createAvatar(identicon, { seed: position.symbol }).toString()} />
                </View>
                <ThemedText style={styles.symbolText}>{position.symbol}</ThemedText>
              </View>
              <View style={styles.positionStats}>
                <View style={styles.percentageContainer}>
                  <ProgressBar percentage={position.percentage} maxWidth={80} />
                  <ThemedText style={styles.percentageText}>{position.percentage}%</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Change Stats Section */}
        <View style={styles.statsSection}>
          <StatItem label='24h' value={agent.change24h} />
          <StatItem label='7d' value={agent.change7d} />
        </View>
      </ThemedView>
      <TradingModal visible={showTradingModal} agent={agent} onClose={handleCloseModal} />
    </>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statItem}>
    <ThemedText style={styles.timeLabel}>{label}</ThemedText>
    <ThemedText
      style={[
        styles.changeValue,
        { color: getStatusColor(parseFloat(value) >= 0) },
      ]}>
      {value}
    </ThemedText>
  </View>
);

const styles = StyleSheet.create({
  card: {
    ...CommonStyles.card,
    marginVertical: SPACING.md,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
    gap: SPACING.lg,
  },
  avatarContainer: {
    width: AVATAR.lg,
    height: AVATAR.lg,
    borderRadius: AVATAR.borderRadius.lg,
    overflow: 'hidden',
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
    gap: SPACING.md,
    justifyContent: 'center',
  },
  agentName: {
    fontSize: FONT_SIZE.title,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.5,
    paddingTop: SPACING.md,
  },
  roleBadge: {
    backgroundColor: '#3D2680',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#9BA3D9',
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  roleBadgeKOL: {
    backgroundColor: Colors.status.success_light,
    borderColor: Colors.status.success_border,
    borderWidth: 1,
  },
  roleTextKOL: {
    color: Colors.status.success,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  buyButton: {
    ...CommonStyles.buttonPrimary,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(157, 77, 255, 0.3)',
    paddingVertical: SPACING.lg,
  },
  buyButtonText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    ...CommonStyles.buttonSecondary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  secondaryButtonText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.semibold,
  },
  positionsSection: {
    marginBottom: SPACING.xxl,
  },
  positionsTitle: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: SPACING.lg,
    letterSpacing: 0.5,
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    flex: 0.4,
  },
  symbolIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    flexShrink: 0,
  },
  symbolText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
  },
  positionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    flex: 0.6,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  percentageText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    minWidth: 50,
    textAlign: 'right',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xxl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borders.lighter,
  },
  statItem: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  timeLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  changeValue: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: -0.5,
  },
});
