import { AgentHeader } from '@/app/components/AgentHeader';
import { AgentLogsTab } from '@/app/components/AgentLogsTab';
import { ExpandedLogsModal } from '@/app/components/ExpandedLogsModal';
import { ProfileTab } from '@/app/components/ProfileTab';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TradingModal } from '@/components/trading-modal';
import { mockAgents } from '@/mocks/mocks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AVATAR_SIZE = 64;
const AVATAR_BORDER_RADIUS = 12;

type TabType = 'profile' | 'logs';

export default function AgentDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { agentId } = useLocalSearchParams<{ agentId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [showTradingModal, setShowTradingModal] = useState(false);
  const [showLogsTime, setShowLogsTime] = useState(true);
  const [logsExpanded, setLogsExpanded] = useState(false);

  const agent = useMemo(() => {
    return mockAgents.find((a) => a.id === agentId);
  }, [agentId]);

  if (!agent) {
    return (
      <ThemedView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>‹</ThemedText>
        </Pressable>
        <ThemedText style={styles.errorText}>Agent not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ThemedText style={styles.backButtonText}>‹</ThemedText>
      </Pressable>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Card Container */}
        <View style={styles.mainCard}>
          {/* Agent Header */}
          <View style={styles.cardHeader}>
            <AgentHeader agent={agent} />
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'profile' && styles.tabActive]}
              onPress={() => setActiveTab('profile')}>
              <ThemedText style={[styles.tabText, activeTab === 'profile' && styles.tabTextActive]}>
                Profile
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'logs' && styles.tabActive]}
              onPress={() => setActiveTab('logs')}>
              <ThemedText style={[styles.tabText, activeTab === 'logs' && styles.tabTextActive]}>
                Agent Logs
              </ThemedText>
            </Pressable>
          </View>

          {/* Tab Content */}
          {activeTab === 'profile' && <ProfileTab onBuyPress={() => setShowTradingModal(true)} />}

          {/* Agent Logs Tab */}
          {activeTab === 'logs' && (
            <AgentLogsTab
              showLogsTime={showLogsTime}
              onShowLogsTimeToggle={() => setShowLogsTime(!showLogsTime)}
              onExpandPress={() => setLogsExpanded(true)}
            />
          )}
        </View>
      </ScrollView>
      <TradingModal
        visible={showTradingModal}
        agent={agent}
        onClose={() => setShowTradingModal(false)}
      />

      <ExpandedLogsModal
        visible={logsExpanded}
        showLogsTime={showLogsTime}
        onClose={() => setLogsExpanded(false)}
        topInset={insets.top}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  mainCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
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
    gap: 2,
    justifyContent: 'center',
  },
  agentId: {
    fontSize: 10,
    color: '#888',
    fontWeight: '500',
  },
  agentName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 28,
  },
  roleBadge: {
    backgroundColor: '#3D2680',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  roleText: {
    color: '#9BA3D9',
    fontSize: 10,
    fontWeight: '600',
  },
  shareButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flexDirection: 'row',
    minHeight: 44,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  shareIcon: {
    fontSize: 12,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  addressLabel: {
    color: '#888',
    fontSize: 13,
    fontWeight: '500',
  },
  addressIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(77, 124, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(77, 124, 255, 0.3)',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '600',
  },
  netWorthSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netWorthLabel: {
    color: '#888',
    fontSize: 13,
    fontWeight: '500',
  },
  netWorthValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tabActive: {
    borderBottomColor: '#4D7CFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logsCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 160, 0.3)',
    backgroundColor: 'rgba(0, 229, 160, 0.05)',
    overflow: 'hidden',
  },
  logsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  logsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logsHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  logsHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logsHeaderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  logsHeaderButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
  },
  logsContentWrapper: {
    backgroundColor: '#000',
    minHeight: 200,
  },
  logsScrollContainer: {
    flex: 1,
  },
  logsListContainer: {
    gap: 0,
    paddingRight: 16,
    paddingLeft: 16,
    paddingVertical: 12,
  },
  logEntry: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  logTimestamp: {
    color: '#666',
    fontSize: 11,
    fontWeight: '400',
    width: 70,
    flexShrink: 0,
  },
  logIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logIconText: {
    fontSize: 10,
    fontWeight: '700',
  },
  logType: {
    fontSize: 11,
    fontWeight: '600',
    width: 70,
    flexShrink: 0,
  },
  logMessage: {
    color: '#b5b5b5',
    fontSize: 11,
    fontWeight: '400',
    flex: 1,
  },
  logsFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#000',
  },
  logsFooterText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '400',
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
    marginBottom: 0,
  },
  settingValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 0,
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
  logsContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  logsPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  backButton: {
    marginTop: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  expandedLogsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  expandedLogsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'transparent',
  },
  expandedLogsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  expandedLogsHeaderButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  expandedLogsHeaderButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
  },
  expandedLogsScrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  expandedLogsListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  expandedLogEntry: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'flex-start',
  },
  expandedLogTimestamp: {
    color: '#666',
    fontSize: 12,
    fontWeight: '400',
    width: 80,
    flexShrink: 0,
  },
  expandedLogIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  expandedLogIconText: {
    fontSize: 12,
    fontWeight: '700',
  },
  expandedLogType: {
    fontSize: 12,
    fontWeight: '600',
    width: 80,
    flexShrink: 0,
  },
  expandedLogMessage: {
    color: '#b5b5b5',
    fontSize: 12,
    fontWeight: '400',
    flex: 1,
    lineHeight: 16,
  },
  expandedLogsFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#000',
  },
  expandedLogsFooterText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '400',
  },
});
