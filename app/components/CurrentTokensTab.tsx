import { ThemedText } from '@/components/themed-text';
import { CurrentToken } from '@/types/types';
import { identicon } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface CurrentTokensTabProps {
  tokens: CurrentToken[];
}

const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'Low Risk':
      return '#00E5A0';
    case 'Medium Risk':
      return '#FFD700';
    case 'High Risk':
      return '#FF6B6B';
    default:
      return '#888';
  }
};

const getRiskBgColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'Low Risk':
      return 'rgba(0, 229, 160, 0.15)';
    case 'Medium Risk':
      return 'rgba(255, 215, 0, 0.15)';
    case 'High Risk':
      return 'rgba(255, 107, 107, 0.15)';
    default:
      return 'rgba(136, 136, 136, 0.15)';
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(6)}`;
};

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
              <View
                style={[styles.riskBadge, { backgroundColor: getRiskBgColor(token.riskLevel) }]}>
                <ThemedText style={[styles.riskText, { color: getRiskColor(token.riskLevel) }]}>
                  {token.riskLevel}
                </ThemedText>
              </View>
            </View>

            {/* Allocation Bar */}
            <View style={styles.allocationContainer}>
              <View style={styles.allocationHeader}>
                <ThemedText style={styles.allocationLabel}>Allocation</ThemedText>
                <ThemedText style={styles.allocationValue}>{token.allocation}%</ThemedText>
              </View>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBar,
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
                  {/* Token Price */}
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconContainer}>
                      <ThemedText style={styles.detailIcon}>💰</ThemedText>
                    </View>
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Token Price</ThemedText>
                      <ThemedText style={styles.detailValue}>${token.price.toFixed(6)}</ThemedText>
                    </View>
                  </View>

                  {/* Liquidity */}
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconContainer}>
                      <ThemedText style={styles.detailIcon}>💧</ThemedText>
                    </View>
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Liquidity</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {formatNumber(token.liquidity || 0)}
                      </ThemedText>
                    </View>
                  </View>

                  {/* Market Cap */}
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconContainer}>
                      <ThemedText style={styles.detailIcon}>📊</ThemedText>
                    </View>
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Market Cap</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {formatNumber(token.marketCap || 0)}
                      </ThemedText>
                    </View>
                  </View>

                  {/* 24h Volume */}
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconContainer}>
                      <ThemedText style={styles.detailIcon}>📈</ThemedText>
                    </View>
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>24h Volume</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {formatNumber(token.volume24h || 0)}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  tokensList: {
    gap: 12,
  },
  tokenCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tokenInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(77, 124, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(77, 124, 255, 0.4)',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  tokenDetails: {
    flex: 1,
    gap: 4,
  },
  tokenSymbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  tokenAddress: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
  },
  allocationContainer: {
    gap: 8,
    marginBottom: 12,
  },
  allocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allocationLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  allocationValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  showMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingTop: 8,
  },
  showMoreText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  chevron: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  expandedDetailsContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(77, 124, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
    gap: 4,
  },
  detailLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
