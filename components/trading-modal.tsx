import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Agent } from '@/types/types';
import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

interface TradingModalProps {
  visible: boolean;
  agent: Agent;
  onClose: () => void;
}

// Constants for configuration
const SYMBOL_ICON_SIZE = 50;
const SYMBOL_ICON_BORDER_RADIUS = 8;
const TOKENS = ['SOL', 'USDC', 'USDT'];
const DEFAULT_AGENT_BALANCE = 0;
const DEFAULT_TAKE_PROFIT = '25';
const DEFAULT_STOP_LOSS = '15';
const SOL_USD_RATE = 195;

export const TradingModal = ({ visible, agent, onClose }: TradingModalProps) => {
  const [amount, setAmount] = useState('0');
  const [selectedToken, setSelectedToken] = useState('SOL');
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [showSLTP, setShowSLTP] = useState(false);
  const [takeProfit, setTakeProfit] = useState(DEFAULT_TAKE_PROFIT);
  const [stopLoss, setStopLoss] = useState(DEFAULT_STOP_LOSS);

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token);
    setShowTokenDropdown(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType='fade' onRequestClose={onClose}>
      {/* Background Overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Modal Container */}
      <View style={styles.centeredView}>
        <ThemedView style={styles.modalContent}>
          {/* Header with Title and Close Button */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={[styles.symbolIcon]}>
                <SvgXml xml={createAvatar(bottts, { seed: agent.name }).toString()} />
              </View>

              <View>
                <ThemedText style={styles.modalTitle}>Trade with {agent.name}</ThemedText>
                <ThemedText style={styles.modalSubtitle}>
                  Open autonomous positions with this agent
                </ThemedText>
              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </Pressable>
          </View>

          {/* Scrollable Content */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Send Tokens Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>⚡ Send Tokens</ThemedText>
                <View style={styles.mainnetBadge}>
                  <ThemedText style={styles.mainnetText}>Mainnet</ThemedText>
                </View>
              </View>

              {/* Amount Input with Token Button Inside */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder='0'
                  placeholderTextColor='#666'
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType='decimal-pad'
                />
                <Pressable
                  style={styles.tokenButtonInside}
                  onPress={() => setShowTokenDropdown(!showTokenDropdown)}>
                  <ThemedText style={styles.tokenButtonInsideText}>⊕ {selectedToken}</ThemedText>
                </Pressable>
              </View>

              {/* Token Dropdown */}
              {showTokenDropdown && (
                <View style={styles.dropdownMenu}>
                  {TOKENS.map((token) => (
                    <Pressable
                      key={token}
                      style={[
                        styles.dropdownItem,
                        selectedToken === token && styles.dropdownItemSelected,
                      ]}
                      onPress={() => handleTokenSelect(token)}>
                      <ThemedText
                        style={[
                          styles.dropdownItemText,
                          selectedToken === token && styles.dropdownItemTextSelected,
                        ]}>
                        {token}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Price and Balance Info */}
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>
                  ${amount ? (parseFloat(amount) * SOL_USD_RATE).toFixed(2) : '0.00'} USD
                </ThemedText>
                <ThemedText style={styles.infoLabel}>
                  Balance: {DEFAULT_AGENT_BALANCE} {selectedToken}
                </ThemedText>
              </View>

              {/* Show SL/TP Options */}
              <Pressable style={styles.slTPButton} onPress={() => setShowSLTP(!showSLTP)}>
                <ThemedText style={styles.slTPText}>Show SL/TP options</ThemedText>
                <ThemedText
                  style={[styles.slTPArrow, showSLTP && { transform: [{ rotate: '180deg' }] }]}>
                  ›
                </ThemedText>
              </Pressable>

              {/* SL/TP Options Section */}
              {showSLTP && (
                <View style={styles.slTPOptionsContainer}>
                  <View style={styles.slTPRow}>
                    <View style={styles.slTPItem}>
                      <ThemedText style={styles.slTPLabel}>📈 Take Profit %</ThemedText>
                      <TextInput
                        style={styles.slTPInput}
                        placeholder={DEFAULT_TAKE_PROFIT}
                        placeholderTextColor='#666666ff'
                        value={takeProfit}
                        onChangeText={setTakeProfit}
                        keyboardType='decimal-pad'
                      />
                      <ThemedText style={styles.slTPDescription}>
                        Optional: Sell when profit reaches this %
                      </ThemedText>
                    </View>
                    <View style={styles.slTPItem}>
                      <ThemedText style={styles.slTPLabel}>📉 Stop Loss %</ThemedText>
                      <TextInput
                        style={styles.slTPInput}
                        placeholder={DEFAULT_STOP_LOSS}
                        placeholderTextColor='#666666ff'
                        value={stopLoss}
                        onChangeText={setStopLoss}
                        keyboardType='decimal-pad'
                      />
                      <ThemedText style={styles.slTPDescription}>
                        Optional: Sell when loss reaches this %
                      </ThemedText>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Protection Level Section */}
            <View style={styles.protectionSection}>
              <View style={styles.protectionHeader}>
                <View style={styles.protectionDot} />
                <ThemedText style={styles.protectionTitle}>Protection Level: Degen</ThemedText>
              </View>
              <ThemedText style={styles.protectionText}>
                Investing in trading agents involves risk. Past performance is not indicative of
                future results.
              </ThemedText>
            </View>
          </ScrollView>

          {/* Send to Agent Pool Button */}
          <Pressable style={styles.sendButton}>
            <ThemedText style={styles.sendButtonText}>⚠ Send to Agent Pool</ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background.overlay,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: Colors.borders.lighter,
    backgroundColor: Colors.neutral.darkCard,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lightest,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  symbolIcon: {
    width: SYMBOL_ICON_SIZE,
    height: SYMBOL_ICON_SIZE,
    borderRadius: SYMBOL_ICON_BORDER_RADIUS,
    flexShrink: 0,
  },
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.neutral.white,
  },
  modalSubtitle: {
    fontSize: FONT_SIZE.xs,
    color: Colors.neutral.gray500,
    marginTop: SPACING.xs,
  },
  closeButton: {
    padding: SPACING.md,
  },
  closeButtonText: {
    fontSize: FONT_SIZE.xxl,
    color: Colors.neutral.white,
    fontWeight: FONT_WEIGHT.semibold,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    maxHeight: 400,
  },
  section: {
    borderWidth: 1,
    borderColor: Colors.primary.main,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: Colors.background.translucent,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.primary.main,
  },
  mainnetBadge: {
    backgroundColor: Colors.status.success_light,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  mainnetText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.status.success,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  amountInput: {
    width: '100%',
    backgroundColor: Colors.neutral.darkCardAlt,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    paddingRight: 140,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.neutral.white,
  },
  tokenButtonInside: {
    position: 'absolute',
    right: SPACING.xs,
    top: 0,
    bottom: 0,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenButtonInsideText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.neutral.white,
  },
  dropdownMenu: {
    backgroundColor: Colors.neutral.darkCardAlt,
    borderWidth: 1,
    borderColor: Colors.primary.light,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lightest,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.primary.lighter,
  },
  dropdownItemText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    color: Colors.neutral.gray500,
  },
  dropdownItemTextSelected: {
    color: Colors.primary.main,
    fontWeight: FONT_WEIGHT.semibold,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  infoLabel: {
    fontSize: FONT_SIZE.xs,
    color: Colors.neutral.gray500,
    fontWeight: FONT_WEIGHT.medium,
  },
  slTPButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  slTPText: {
    fontSize: FONT_SIZE.lg,
    color: Colors.neutral.gray500,
    fontWeight: FONT_WEIGHT.medium,
  },
  slTPArrow: {
    fontSize: FONT_SIZE.lg,
    color: Colors.neutral.gray500,
    fontWeight: FONT_WEIGHT.semibold,
  },
  slTPOptionsContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borders.lightest,
  },
  slTPRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  slTPItem: {
    flex: 1,
  },
  slTPLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.neutral.white,
    marginBottom: SPACING.xs,
  },
  slTPInput: {
    backgroundColor: Colors.neutral.darkCardAlt,
    borderWidth: 1,
    borderColor: Colors.primary.light,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.neutral.white,
    marginBottom: SPACING.xs,
  },
  slTPDescription: {
    fontSize: FONT_SIZE.xs,
    color: Colors.neutral.gray600,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: 14,
  },
  protectionSection: {
    marginBottom: SPACING.lg,
  },
  protectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  protectionDot: {
    width: SPACING.xs,
    height: SPACING.xs,
    borderRadius: SPACING.xs / 2,
    backgroundColor: Colors.secondary.purple,
  },
  protectionTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.neutral.white,
  },
  protectionText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.neutral.gray600,
    lineHeight: 18,
    fontWeight: FONT_WEIGHT.regular,
  },
  sendButton: {
    backgroundColor: Colors.primary.main,
    paddingVertical: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borders.lightest,
  },
  sendButtonText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.neutral.white,
  },
});
