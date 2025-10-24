import { ThemedText } from '@/components/themed-text';
import { mockAgentLogs } from '@/mocks/mocks';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

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
                            ? Colors.status.success_light
                            : Colors.primary.light,
                      },
                    ]}>
                    <ThemedText
                      style={[
                        styles.logIconText,
                        {
                          color: log.type === 'SUCCESS' ? Colors.status.success : Colors.primary.main,
                        },
                      ]}>
                      {log.type === 'SUCCESS' ? '✓' : 'ⓘ'}
                    </ThemedText>
                  </View>
                  <ThemedText
                    style={[
                      styles.logType,
                      {
                        color: log.type === 'SUCCESS' ? Colors.status.success : Colors.primary.main,
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
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  logsCard: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.status.success_border,
    backgroundColor: Colors.status.success_light,
    overflow: 'hidden',
  },
  logsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
  },
  logsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  logsHeaderTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.neutral.white,
  },
  logsHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  logsHeaderButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
  },
  logsHeaderButtonText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    color: Colors.neutral.gray500,
  },
  logsContentWrapper: {
    backgroundColor: Colors.neutral.black,
    minHeight: 200,
  },
  logsScrollContainer: {
    flex: 1,
  },
  logsListContainer: {
    gap: 0,
    paddingRight: SPACING.lg,
    paddingLeft: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  logEntry: {
    flexDirection: 'row',
    gap: SPACING.lg,
    paddingVertical: SPACING.md,
    alignItems: 'flex-start',
  },
  logTimestamp: {
    color: Colors.neutral.gray600,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    width: 70,
    flexShrink: 0,
  },
  logIcon: {
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logIconText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  logType: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
    width: 70,
    flexShrink: 0,
  },
  logMessage: {
    color: Colors.neutral.gray400,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    flex: 1,
  },
  logsFooter: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borders.lighter,
    backgroundColor: Colors.neutral.black,
  },
  logsFooterText: {
    color: Colors.neutral.gray700,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
  },
});
