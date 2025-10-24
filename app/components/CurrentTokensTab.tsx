import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui/badge';
import { CurrentToken } from '@/types/types';
import { identicon } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, AVATAR, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';
import { CommonStyles } from '@/constants/commonStyles';
import { formatNumber, getRiskColor } from '@/utils/styling';

interface CurrentTokensTabProps {
  tokens: CurrentToken[];
}

export function CurrentTokensTab({ tokens }: CurrentTokensTabProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Current Tokens</ThemedText>

      <View style={styles.tokensList}>
        {tokens.map((token, index) => (
          <Pressable key={index} style={styles.tokenCard} onPress={() => toggleExpand(index)}>
            {/* Token Header */}
            <View style={styles.tokenHeader}>
              <View style={styles.tokenInfo}>
                {/* Avatar */}
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    <SvgXml xml={createAvatar(identicon, { seed: token.symbol }).toString()} />
                  </View>
                </View>

                {/* Token Details */}
                <View style={styles.tokenDetails}>
                  <ThemedText style={styles.tokenSymbol}>{token.symbol}</ThemedText>
                  <ThemedText style={styles.tokenAddress}>{token.address}</ThemedText>
                </View>
              </View>

              {/* Risk Badge */}
              <Badge customRiskLevel={token.riskLevel as any} label={token.riskLevel} />
            </View>

            {/* Allocation Bar */}
            <View style={styles.allocationContainer}>
              <View style={styles.allocationHeader}>
                <ThemedText style={styles.allocationLabel}>Allocation</ThemedText>
                <ThemedText style={styles.allocationValue}>{token.allocation}%</ThemedText>
              </View>
              <View style={CommonStyles.progressBarContainer}>
                <View
                  style={[
                    CommonStyles.progressBarFill,
                    {
                      width: `${token.allocation}%`,
                      backgroundColor: getRiskColor(token.riskLevel),
                    },
                  ]}
                />
              </View>
            </View>

            {/* Show More Indicator */}
            <View style={styles.showMoreContainer}>
              <ThemedText style={styles.showMoreText}>
                {expandedIndex === index ? 'Show less' : 'Show more'}
              </ThemedText>
              <ThemedText
                style={[
                  styles.chevron,
                  { transform: [{ rotate: expandedIndex === index ? '180deg' : '0deg' }] },
                ]}>
                ‹
              </ThemedText>
            </View>

            {/* Expanded Details - Inside Card */}
            {expandedIndex === index && token.price !== undefined && (
              <View style={styles.expandedDetailsContainer}>
                <View style={styles.detailsGrid}>
                  <DetailItem icon='💰' label='Token Price' value={`$${token.price.toFixed(6)}`} />
                  <DetailItem icon='💧' label='Liquidity' value={formatNumber(token.liquidity || 0)} />
                  <DetailItem icon='📊' label='Market Cap' value={formatNumber(token.marketCap || 0)} />
                  <DetailItem icon='📈' label='24h Volume' value={formatNumber(token.volume24h || 0)} />
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const DetailItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.detailItem}>
    <View style={styles.detailIconContainer}>
      <ThemedText style={styles.detailIcon}>{icon}</ThemedText>
    </View>
    <View style={styles.detailContent}>
      <ThemedText style={styles.detailLabel}>{label}</ThemedText>
      <ThemedText style={styles.detailValue}>{value}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  title: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.lg,
  },
  tokensList: {
    gap: SPACING.md,
  },
  tokenCard: {
    ...CommonStyles.cardCompact,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  tokenInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatarWrapper: {
    width: AVATAR.sm,
    height: AVATAR.sm,
    borderRadius: AVATAR.borderRadius.sm,
    overflow: 'hidden',
    backgroundColor: Colors.primary.light,
    borderWidth: 1,
    borderColor: Colors.primary.lighter,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  tokenDetails: {
    flex: 1,
    gap: SPACING.xs,
  },
  tokenSymbol: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  tokenAddress: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  allocationContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  allocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allocationLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  allocationValue: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
  showMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingTop: SPACING.md,
  },
  showMoreText: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  chevron: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
  },
  expandedDetailsContainer: {
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borders.lighter,
    marginTop: SPACING.md,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.lg,
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: Colors.primary.lighter,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: FONT_SIZE.xxl,
  },
  detailContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  detailLabel: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  detailValue: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
});
