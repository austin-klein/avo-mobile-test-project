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
          {activeTab === 'profile' && (
            <ProfileTab onBuyPress={() => setShowTradingModal(true)} agent={agent} />
          )}

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
});
