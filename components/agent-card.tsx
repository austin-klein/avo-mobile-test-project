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

// Constants for dimensions
const AVATAR_SIZE = 80;
const AVATAR_BORDER_RADIUS = 16;
const SYMBOL_ICON_SIZE = 32;
const SYMBOL_ICON_BORDER_RADIUS = 8;
const PROGRESS_BAR_MAX_WIDTH = 80;

const renderProgressBar = (percentage: number, maxWidth: number = PROGRESS_BAR_MAX_WIDTH) => {
  const filledWidth = (percentage / 100) * maxWidth;
  return (
    <View style={[styles.progressBarContainer, { width: maxWidth }]}>
      <View
        style={[
          styles.progressBarFill,
          {
            width: filledWidth,
            backgroundColor: percentage > 50 ? '#00C896' : '#4D9DFF',
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
            <View style={styles.roleBadge}>
              <ThemedText style={styles.roleText}>{agent.role}</ThemedText>
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
        <View style={styles.divider} />

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
                  {renderProgressBar(position.percentage, 80)}
                  <ThemedText style={styles.percentageText}>{position.percentage}%</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Change Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <ThemedText style={styles.timeLabel}>24h</ThemedText>
            <ThemedText style={styles.changeValue}>{agent.change24h}</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.timeLabel}>7d</ThemedText>
            <ThemedText style={styles.changeValue}>{agent.change7d}</ThemedText>
          </View>
        </View>
      </ThemedView>
      <TradingModal visible={showTradingModal} agent={agent} onClose={handleCloseModal} />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_BORDER_RADIUS,
    overflow: 'hidden',
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  agentName: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
    paddingTop: 14,
  },
  roleBadge: {
    backgroundColor: '#3D2680',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#9BA3D9',
    fontSize: 13,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#4D7CFF',
    paddingVertical: 15,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(157, 77, 255, 0.3)',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 20,
  },
  positionsSection: {
    marginBottom: 24,
  },
  positionsTitle: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 0.4,
  },
  symbolIcon: {
    width: SYMBOL_ICON_SIZE,
    height: SYMBOL_ICON_SIZE,
    borderRadius: SYMBOL_ICON_BORDER_RADIUS,
    flexShrink: 0,
  },
  symbolText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  positionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 0.6,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2.5,
    overflow: 'hidden',
    flex: 1,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  percentageText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    minWidth: 50,
    textAlign: 'right',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  timeLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  changeValue: {
    color: '#00E5A0',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});
