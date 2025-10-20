import { ThemedText } from '@/components/themed-text';
import { mockAgentLogs } from '@/mocks/mocks';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface AgentLogsTabProps {
  showLogsTime: boolean;
  onShowLogsTimeToggle: () => void;
  onExpandPress: () => void;
}

export function AgentLogsTab({
  showLogsTime,
  onShowLogsTimeToggle,
  onExpandPress,
}: AgentLogsTabProps) {
  return (
    <View style={styles.tabContent}>
      <View style={styles.logsCard}>
        {/* Logs Header */}
        <View style={styles.logsHeader}>
          <View style={styles.logsHeaderLeft}>
            <ThemedText style={styles.logsHeaderTitle}>Agent Activity Logs</ThemedText>
          </View>
          <View style={styles.logsHeaderRight}>
            <Pressable style={styles.logsHeaderButton} onPress={onShowLogsTimeToggle}>
              <ThemedText style={styles.logsHeaderButtonText}>
                {showLogsTime ? 'Hide Time' : 'Show Time'}
              </ThemedText>
            </Pressable>
            <Pressable style={styles.logsHeaderButton} onPress={onExpandPress}>
              <ThemedText style={styles.logsHeaderButtonText}>⤢</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Logs Content */}
        <View style={styles.logsContentWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={16}
            style={styles.logsScrollContainer}>
            <View style={styles.logsListContainer}>
              {mockAgentLogs.map((log) => (
                <View key={log.id} style={styles.logEntry}>
                  {showLogsTime && (
                    <ThemedText style={styles.logTimestamp}>{log.timestamp}</ThemedText>
                  )}
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
                  <ThemedText
                    style={[
                      styles.logType,
                      {
                        color: log.type === 'SUCCESS' ? '#00E5A0' : '#4D9DFF',
                      },
                    ]}>
                    [{log.type}]
                  </ThemedText>
                  <ThemedText style={styles.logMessage}>{log.message}</ThemedText>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Logs Footer */}
        <View style={styles.logsFooter}>
          <ThemedText style={styles.logsFooterText}>Displaying last 100 log entries.</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
