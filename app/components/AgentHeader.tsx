import { ThemedText } from '@/components/themed-text';
import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Pressable, Share, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, AVATAR, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

interface Agent {
  id: string;
  name: string;
  role: string;
}

interface AgentHeaderProps {
  agent: Agent;
}

export function AgentHeader({ agent }: AgentHeaderProps) {
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
    <>
      <View style={styles.headerTop}>
        <View style={styles.avatarContainer}>
          <SvgXml xml={createAvatar(bottts, { seed: agent.name }).toString()} />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText style={styles.agentId}>Agent {agent.id.padStart(3, '0')}</ThemedText>
          <ThemedText type='defaultSemiBold' style={styles.agentName}>
            {agent.name}
          </ThemedText>
          <View
            style={[styles.roleBadge, agent.role === 'KOL Tracker Agent' && styles.roleBadgeKOL]}>
            <ThemedText
              style={[styles.roleText, agent.role === 'KOL Tracker Agent' && styles.roleTextKOL]}>
              {agent.role}
            </ThemedText>
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
    </>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    width: AVATAR.md,
    height: AVATAR.md,
    borderRadius: AVATAR.borderRadius.md,
    overflow: 'hidden',
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
    gap: SPACING.xs,
    justifyContent: 'center',
  },
  agentId: {
    fontSize: FONT_SIZE.xs,
    color: Colors.neutral.gray500,
    fontWeight: FONT_WEIGHT.medium,
  },
  agentName: {
    fontSize: FONT_SIZE.title,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.neutral.white,
    lineHeight: 28,
  },
  roleBadge: {
    backgroundColor: '#3D2680',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  roleText: {
    color: '#9BA3D9',
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  roleBadgeKOL: {
    backgroundColor: Colors.status.success_light,
    borderColor: Colors.status.success_border,
    borderWidth: 1,
  },
  roleTextKOL: {
    color: Colors.status.success,
  },
  shareButton: {
    borderWidth: 1,
    borderColor: Colors.borders.light,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    flexDirection: 'row',
    minHeight: 44,
  },
  shareButtonText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  shareIcon: {
    fontSize: FONT_SIZE.xs,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  addressIcons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: Colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary.lighter,
  },
  iconText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  netWorthSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netWorthLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  netWorthValue: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
});
