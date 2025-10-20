import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockAgentLogs, mockAgents } from '@/mocks/mocks';
import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const AVATAR_SIZE = 64;
const AVATAR_BORDER_RADIUS = 12;

type TabType = 'profile' | 'logs';
type ProtectionLevel = 'degen' | 'moderate' | 'guarded';

export default function AgentDetailScreen() {
  const router = useRouter();
  const { agentId } = useLocalSearchParams<{ agentId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [selectedProtection, setSelectedProtection] = useState<ProtectionLevel>('degen');

  const agent = useMemo(() => {
    return mockAgents.find((a) => a.id === agentId);
  }, [agentId]);

  if (!agent) {
    return (
      <ThemedView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>‹ Back</ThemedText>
        </Pressable>
        <ThemedText style={styles.errorText}>Agent not found</ThemedText>
      </ThemedView>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${agent.name} - ${agent.role}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ThemedText style={styles.backButtonText}>‹ Back</ThemedText>
      </Pressable>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Card Container */}
        <View style={styles.mainCard}>
          {/* Agent Header */}
          <View style={styles.cardHeader}>
            <View style={styles.headerTop}>
              <View style={styles.avatarContainer}>
                <SvgXml xml={createAvatar(bottts, { seed: agent.name }).toString()} />
              </View>
              <View style={styles.headerInfo}>
                <ThemedText style={styles.agentId}>Agent {agent.id.padStart(3, '0')}</ThemedText>
                <ThemedText type='defaultSemiBold' style={styles.agentName}>
                  {agent.name}
                </ThemedText>
                <View style={styles.roleBadge}>
                  <ThemedText style={styles.roleText}>{agent.role}</ThemedText>
                </View>
              </View>
              <Pressable style={styles.shareButton} onPress={handleShare}>
                <ThemedText style={styles.shareButtonText}>Share</ThemedText>
                <ThemedText style={styles.shareIcon}>🔗</ThemedText>
              </Pressable>
            </View>

            {/* Address Info */}
            <View style={styles.addressSection}>
              <ThemedText style={styles.addressLabel}>DLBX5••••wpR...</ThemedText>
              <View style={styles.addressIcons}>
                <View style={styles.iconBadge}>
                  <ThemedText style={styles.iconText}>⓵</ThemedText>
                </View>
                <View style={styles.iconBadge}>
                  <ThemedText style={styles.iconText}>🔍</ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.netWorthSection}>
              <ThemedText style={styles.netWorthLabel}>Net Worth: </ThemedText>
              <ThemedText style={styles.netWorthValue}>$1,791.60</ThemedText>
            </View>
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
                  <Pressable
                    style={[
                      styles.protectionButton,
                      selectedProtection === 'degen' && styles.protectionButtonActive,
                    ]}
                    onPress={() => setSelectedProtection('degen')}>
                    <View
                      style={[
                        styles.protectionRadio,
                        selectedProtection === 'degen' && styles.protectionRadioActive,
                      ]}>
                      {selectedProtection === 'degen' && <View style={styles.protectionRadioDot} />}
                    </View>
                    <ThemedText style={styles.protectionButtonText}>Degen</ThemedText>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.protectionButton,
                      selectedProtection === 'moderate' && styles.protectionButtonActive,
                    ]}
                    onPress={() => setSelectedProtection('moderate')}>
                    <View
                      style={[
                        styles.protectionRadio,
                        selectedProtection === 'moderate' && styles.protectionRadioActive,
                      ]}>
                      {selectedProtection === 'moderate' && (
                        <View style={styles.protectionRadioDot} />
                      )}
                    </View>
                    <ThemedText style={styles.protectionButtonText}>Moderate</ThemedText>
                  </Pressable>
                </View>

                <Pressable
                  style={[
                    styles.protectionButton,
                    styles.protectionButtonFull,
                    selectedProtection === 'guarded' && styles.protectionButtonActive,
                  ]}
                  onPress={() => setSelectedProtection('guarded')}>
                  <View
                    style={[
                      styles.protectionRadio,
                      selectedProtection === 'guarded' && styles.protectionRadioActive,
                    ]}>
                    {selectedProtection === 'guarded' && <View style={styles.protectionRadioDot} />}
                  </View>
                  <ThemedText style={styles.protectionButtonText}>Guarded</ThemedText>
                </Pressable>

                <ThemedText style={styles.protectionDescription}>
                  High risk, high reward with minimal protections
                </ThemedText>
              </View>

              {/* Protection Settings Cards */}
              <View style={styles.settingsSection}>
                <ThemedText style={styles.settingsTitle}>
                  {selectedProtection.charAt(0).toUpperCase() + selectedProtection.slice(1)}{' '}
                  Protection Settings:
                </ThemedText>

                <View style={styles.settingCard}>
                  <ThemedText style={styles.settingLabel}>Min. Market Cap</ThemedText>
                  <ThemedText style={styles.settingValue}>$10,000</ThemedText>
                  <ThemedText style={styles.settingRequired}>Min. Required:</ThemedText>
                </View>

                <View style={styles.settingCard}>
                  <ThemedText style={styles.settingLabel}>Min. Liquidity</ThemedText>
                  <ThemedText style={styles.settingValue}>$5,000</ThemedText>
                  <ThemedText style={styles.settingRequired}>Min. Required:</ThemedText>
                </View>

                <View style={styles.settingCard}>
                  <ThemedText style={styles.settingLabel}>Min. 24h Volume</ThemedText>
                  <ThemedText style={styles.settingValue}>$5,000</ThemedText>
                  <ThemedText style={styles.settingRequired}>Min. Required:</ThemedText>
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
              <Pressable style={styles.buyButton}>
                <ThemedText style={styles.buyButtonText}>Buy Agent</ThemedText>
                <ThemedText style={styles.buyButtonArrow}> ›</ThemedText>
              </Pressable>
            </View>
          )}

          {/* Agent Logs Tab */}
          {activeTab === 'logs' && (
            <View style={styles.logsContent}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                scrollEventThrottle={16}
                style={styles.logsScrollContainer}>
                <View style={styles.logsListContainer}>
                  {mockAgentLogs.map((log) => (
                    <View key={log.id} style={styles.logEntry}>
                      <View style={styles.logLeftHalf}>
                        <ThemedText style={styles.logTimestamp}>{log.timestamp}</ThemedText>
                        <View
                          style={[
                            styles.logIcon,
                            {
                              backgroundColor:
                                log.type === 'SUCCESS'
                                  ? 'rgba(0, 229, 160, 0.15)'
                                  : 'rgba(77, 124, 255, 0.15)',
                            },
                          ]}>
                          <ThemedText
                            style={[
                              styles.logIconText,
                              {
                                color: log.type === 'SUCCESS' ? '#00E5A0' : '#4D9DFF',
                              },
                            ]}>
                            {log.type === 'SUCCESS' ? '✓' : 'ⓘ'}
                          </ThemedText>
                        </View>
                        <ThemedText style={styles.logType}>[{log.type}]</ThemedText>
                      </View>
                      <View style={styles.logRightHalf}>
                        <ThemedText style={styles.logMessage}>{log.message}</ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <View style={styles.logsFooter}>
                <ThemedText style={styles.logsFooterText}>
                  Displaying last 100 log entries.
                </ThemedText>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
  logsContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  logsScrollContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    flex: 1,
  },
  logsListContainer: {
    gap: 8,
    paddingRight: 16,
  },
  logEntry: {
    flexDirection: 'row',
    gap: 85,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  logLeftHalf: {
    width: 140,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexShrink: 0,
  },
  logTimestamp: {
    color: '#666',
    fontSize: 11,
    fontWeight: '400',
    width: 120,
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
    width: 60,
    flexShrink: 0,
  },
  logRightHalf: {
    flex: 1,
    paddingLeft: 4,
  },
  logMessage: {
    color: '#b5b5b5ff',
    fontSize: 11,
    fontWeight: '400',
    flexWrap: 'nowrap',
  },
  logsFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
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
  },
  protectionButton: {
    flex: 1,
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
    flex: 1,
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
  settingLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  settingValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
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
    marginBottom: 16,
  },
  backButtonText: {
    color: '#4D7CFF',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
