import { ThemedText } from '@/components/themed-text';
import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Pressable, Share, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const AVATAR_SIZE = 64;
const AVATAR_BORDER_RADIUS = 12;

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
    </>
  );
}

const styles = StyleSheet.create({
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
});
