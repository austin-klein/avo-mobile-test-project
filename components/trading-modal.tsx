import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Agent } from '@/types/types';
import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface TradingModalProps {
  visible: boolean;
  agent: Agent;
  onClose: () => void;
}

// Constants for dimensions and configuration
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3aabd131',
    backgroundColor: 'rgba(13, 17, 28, 0.95)',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  symbolIcon: {
    width: SYMBOL_ICON_SIZE,
    height: SYMBOL_ICON_SIZE,
    borderRadius: SYMBOL_ICON_BORDER_RADIUS,
    flexShrink: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: 400,
  },
  section: {
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00BFFF',
  },
  mainnetBadge: {
    backgroundColor: 'rgba(0, 200, 136, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mainnetText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00C888',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  amountInput: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 140,
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  tokenButtonInside: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenButtonInsideText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  dropdownMenu: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(77, 157, 255, 0.3)',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(77, 157, 255, 0.2)',
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
  },
  dropdownItemTextSelected: {
    color: '#4D9DFF',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  slTPButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  slTPText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  slTPArrow: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  slTPOptionsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  slTPRow: {
    flexDirection: 'row',
    gap: 12,
  },
  slTPItem: {
    flex: 1,
  },
  slTPLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  slTPInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(77, 157, 255, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  slTPDescription: {
    fontSize: 11,
    color: '#666',
    fontWeight: '400',
    lineHeight: 14,
  },
  protectionSection: {
    marginBottom: 20,
  },
  protectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  protectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B068FF',
  },
  protectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  protectionText: {
    fontSize: 12,
    color: '#666666ff',
    lineHeight: 18,
    fontWeight: '400',
  },
  sendButton: {
    backgroundColor: '#4D7CFF',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
