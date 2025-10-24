import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockAgentLogs } from '@/mocks/mocks';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

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
                          ? Colors.status.success_light
                          : Colors.primary.light,
                    },
                  ]}>
                  <ThemedText
                    style={[
                      styles.expandedLogIconText,
                      {
                        color: log.type === 'SUCCESS' ? Colors.status.success : Colors.primary.main,
                      },
                    ]}>
                    {log.type === 'SUCCESS' ? '✓' : 'ⓘ'}
                  </ThemedText>
                </View>
                <ThemedText
                  style={[
                    styles.expandedLogType,
                    {
                      color: log.type === 'SUCCESS' ? Colors.status.success : Colors.primary.main,
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
    backgroundColor: Colors.neutral.black,
  },
  expandedLogsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
    backgroundColor: 'transparent',
  },
  expandedLogsTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.neutral.white,
  },
  expandedLogsHeaderButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
  },
  expandedLogsHeaderButtonText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    color: Colors.neutral.gray500,
  },
  expandedLogsScrollContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.black,
  },
  expandedLogsListContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  expandedLogEntry: {
    flexDirection: 'row',
    gap: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lightest,
    alignItems: 'flex-start',
  },
  expandedLogTimestamp: {
    color: Colors.neutral.gray600,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    width: 80,
    flexShrink: 0,
  },
  expandedLogIcon: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  expandedLogIconText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  expandedLogType: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    width: 80,
    flexShrink: 0,
  },
  expandedLogMessage: {
    color: Colors.neutral.gray400,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    flex: 1,
    lineHeight: 16,
  },
  expandedLogsFooter: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borders.lighter,
    backgroundColor: Colors.neutral.black,
  },
  expandedLogsFooterText: {
    color: Colors.neutral.gray700,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
  },
});
