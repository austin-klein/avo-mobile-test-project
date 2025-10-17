import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';

interface FilterProps {
  onTypeChange: (type: string) => void;
  onProtectionChange: (protection: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
}

const TYPE_OPTIONS = ['Wallets', 'Traders', 'Funds'];
const PROTECTION_OPTIONS = ['Degen', 'Standard', 'Conservative'];
const SORT_OPTIONS = ['24h', '7d', '30d'];

export function AgentFilters({
  onTypeChange,
  onProtectionChange,
  onSortChange,
  onSearchChange,
}: FilterProps) {
  const [selectedType, setSelectedType] = useState('Wallets');
  const [selectedProtection, setSelectedProtection] = useState('Degen');
  const [selectedSort, setSelectedSort] = useState('24h');
  const [searchText, setSearchText] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onTypeChange(type);
    setActiveDropdown(null);
  };

  const handleProtectionSelect = (protection: string) => {
    setSelectedProtection(protection);
    onProtectionChange(protection);
    setActiveDropdown(null);
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
    setActiveDropdown(null);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearchChange(text);
  };

  const DropdownButton = ({
    label,
    value,
    onPress,
    id,
  }: {
    label: string;
    value: string;
    onPress: () => void;
    id: string;
  }) => (
    <Pressable onPress={onPress} style={styles.dropdownButton}>
      <View style={styles.dropdownContent}>
        <ThemedText style={styles.dropdownLabel}>{label}: </ThemedText>
        <ThemedText style={styles.dropdownValue}>{value}</ThemedText>
      </View>
      <ThemedText style={styles.dropdownArrow}>›</ThemedText>
    </Pressable>
  );

  const DropdownMenu = ({
    options,
    selected,
    onSelect,
    id,
  }: {
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
    id: string;
  }) => (
    <Modal
      visible={activeDropdown === id}
      transparent
      animationType='fade'
      onRequestClose={() => setActiveDropdown(null)}>
      <Pressable style={styles.dropdownOverlay} onPress={() => setActiveDropdown(null)}>
        <View style={styles.dropdownMenuContainer}>
          {options.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.dropdownMenuItem,
                selected === option && styles.dropdownMenuItemSelected,
              ]}
              onPress={() => onSelect(option)}>
              <ThemedText
                style={[
                  styles.dropdownMenuText,
                  selected === option && styles.dropdownMenuTextSelected,
                ]}>
                {option}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Search Box - Always Visible */}
      <TextInput
        style={styles.searchBox}
        placeholder='Search for agents...'
        placeholderTextColor='#888'
        value={searchText}
        onChangeText={handleSearchChange}
      />

      {/* Expandable Filters Section */}
      {filtersOpen && (
        <View style={styles.filtersContent}>
          {/* Type Dropdown */}
          <DropdownButton
            label='Type'
            value={selectedType}
            onPress={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
            id='type'
          />
          <DropdownMenu
            id='type'
            options={TYPE_OPTIONS}
            selected={selectedType}
            onSelect={handleTypeSelect}
          />

          {/* Protection Level Dropdown */}
          <DropdownButton
            label='Protection level'
            value={selectedProtection}
            onPress={() => setActiveDropdown(activeDropdown === 'protection' ? null : 'protection')}
            id='protection'
          />
          <DropdownMenu
            id='protection'
            options={PROTECTION_OPTIONS}
            selected={selectedProtection}
            onSelect={handleProtectionSelect}
          />

          {/* Sort Dropdown */}
          <DropdownButton
            label='Sort'
            value={selectedSort}
            onPress={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
            id='sort'
          />
          <DropdownMenu
            id='sort'
            options={SORT_OPTIONS}
            selected={selectedSort}
            onSelect={handleSortSelect}
          />
        </View>
      )}

      {/* Filter Toggle Button and Search */}
      <View style={styles.headerRow}>
        <Pressable
          style={[styles.filterButton, filtersOpen && styles.filterButtonActive]}
          onPress={() => setFiltersOpen(!filtersOpen)}>
          <ThemedText style={styles.filterButtonText}>
            {' '}
            {filtersOpen ? 'Hide' : 'Show'} Filters
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(77, 124, 255, 0.2)',
    borderColor: 'rgba(77, 124, 255, 0.4)',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  filtersContent: {
    gap: 12,
  },
  searchBox: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContent: {
    flexDirection: 'row',
  },
  dropdownLabel: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenuContainer: {
    width: '80%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    overflow: 'hidden',
  },
  dropdownMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  dropdownMenuItemSelected: {
    backgroundColor: 'rgba(77, 124, 255, 0.2)',
  },
  dropdownMenuText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownMenuTextSelected: {
    color: '#4D7CFF',
    fontWeight: '600',
  },
});
