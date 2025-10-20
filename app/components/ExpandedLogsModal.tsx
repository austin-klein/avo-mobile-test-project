import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockAgentLogs } from '@/mocks/mocks';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface ExpandedLogsModalProps {
  visible: boolean;
  showLogsTime: boolean;
  onClose: () => void;
  topInset: number;
}

export function ExpandedLogsModal({
  visible,
  showLogsTime,
  onClose,
  topInset,
}: ExpandedLogsModalProps) {
  return (
    <Modal visible={visible} animationType='slide' transparent={false} statusBarTranslucent>
      <ThemedView style={styles.expandedLogsContainer}>
        {/* Modal Header */}
        <View style={[styles.expandedLogsHeader, { paddingTop: topInset }]}>
          <ThemedText style={styles.expandedLogsTitle}>Agent Activity Logs</ThemedText>
          <Pressable style={styles.expandedLogsHeaderButton} onPress={onClose}>
            <ThemedText style={styles.expandedLogsHeaderButtonText}>✕</ThemedText>
          </Pressable>
        </View>

        {/* Expanded Logs Content */}
        <ScrollView
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          style={styles.expandedLogsScrollContainer}>
          <View style={styles.expandedLogsListContainer}>
            {mockAgentLogs.map((log) => (
              <View key={log.id} style={styles.expandedLogEntry}>
                {showLogsTime && (
                  <ThemedText style={styles.expandedLogTimestamp}>{log.timestamp}</ThemedText>
                )}
                <View
                  style={[
                    styles.expandedLogIcon,
                    {
                      backgroundColor:
                        log.type === 'SUCCESS'
                          ? 'rgba(0, 229, 160, 0.15)'
                          : 'rgba(77, 124, 255, 0.15)',
                    },
                  ]}>
                  <ThemedText
                    style={[
                      styles.expandedLogIconText,
                      {
                        color: log.type === 'SUCCESS' ? '#00E5A0' : '#4D9DFF',
                      },
                    ]}>
                    {log.type === 'SUCCESS' ? '✓' : 'ⓘ'}
                  </ThemedText>
                </View>
                <ThemedText
                  style={[
                    styles.expandedLogType,
                    {
                      color: log.type === 'SUCCESS' ? '#00E5A0' : '#4D9DFF',
                    },
                  ]}>
                  [{log.type}]
                </ThemedText>
                <ThemedText style={styles.expandedLogMessage}>{log.message}</ThemedText>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Modal Footer */}
        <View style={styles.expandedLogsFooter}>
          <ThemedText style={styles.expandedLogsFooterText}>
            Displaying last 100 log entries.
          </ThemedText>
        </View>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
