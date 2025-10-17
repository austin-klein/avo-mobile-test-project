import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Agent } from '@/types/types';
import { bottts, identicon } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const renderProgressBar = (percentage: number, maxWidth: number = 80) => {
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

export const renderAgentCard = (agent: Agent) => {
  return (
    <ThemedView style={styles.card}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          <View style={{ flex: 1 }}>
            <SvgXml xml={createAvatar(bottts, { seed: agent.name }).toString()} />
          </View>
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
        <Pressable style={styles.buyButton}>
          <ThemedText style={styles.buyButtonText}>Buy ›</ThemedText>
        </Pressable>
        <Pressable style={styles.secondaryButton}>
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
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  agentName: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  roleBadge: {
    backgroundColor: '#3D2680',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#9BA3D9',
    fontSize: 13,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
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
    paddingHorizontal: 16,
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
    width: 32,
    height: 32,
    borderRadius: 8,
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
