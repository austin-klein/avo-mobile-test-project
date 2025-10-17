import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Agent } from '@/types/types';
import { Pressable, StyleSheet, View } from 'react-native';

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
          <View style={styles.avatar} />
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
              <View
                style={[
                  styles.symbolIcon,
                  { backgroundColor: index === 0 ? '#4D9DFF' : '#00C896' },
                ]}
              />
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
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    backgroundColor: '#4FD167',
  },
  headerInfo: {
    flex: 1,
    gap: 8,
  },
  agentName: {
    fontSize: 24,
    fontWeight: '600',
  },
  roleBadge: {
    backgroundColor: '#2D1B69',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#8B9FD9',
    fontSize: 12,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#4D9DFF',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  positionsSection: {
    marginBottom: 16,
  },
  positionsTitle: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  symbolIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  symbolText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  positionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'right',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  timeLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  changeValue: {
    color: '#00C896',
    fontSize: 20,
    fontWeight: '700',
  },
});
