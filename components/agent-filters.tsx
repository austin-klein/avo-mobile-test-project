import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockAgents } from '@/mocks/mocks';
import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { DropdownButton } from './ui/DropdownButton';

interface FilterProps {
  onTypeChange: (type: string) => void;
  onProtectionChange: (protection: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
}

const TYPE_OPTIONS = ['Wallets', 'Indexes', 'Reasoning Agents'];
const PROTECTION_OPTIONS = ['Degen', 'Moderate', 'Guarded'];
const SORT_OPTIONS = ['24h', '7d', '1M'];
const AVATAR_SIZE = 32;
const AVATAR_BORDER_RADIUS = 6;

export function AgentFilters({
  onTypeChange,
  onProtectionChange,
  onSortChange,
  onSearchChange,
}: FilterProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('Wallets');
  const [selectedProtection, setSelectedProtection] = useState('Degen');
  const [selectedSort, setSelectedSort] = useState('24h');
  const [searchText, setSearchText] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchResults = searchText.trim()
    ? mockAgents.filter((agent) => agent.name.toLowerCase().includes(searchText.toLowerCase()))
    : [];

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
    setShowSearchResults(text.trim().length > 0);
  };

  const handleSearchResultPress = (agentId: string) => {
    setShowSearchResults(false);
    router.push({
      pathname: '/agent-detail',
      params: { agentId },
    });
  };

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
  }) => {
    if (activeDropdown !== id) return null;

    return (
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
    );
  };

  const SearchResultsDropdown = () => {
    if (!showSearchResults || searchResults.length === 0) return null;

    return (
      <View style={styles.searchResultsContainer}>
        {searchResults.map((agent) => (
          <Pressable
            key={agent.id}
            style={styles.searchResultItem}
            onPress={() => handleSearchResultPress(agent.id)}>
            <View style={styles.searchResultAvatar}>
              <SvgXml xml={createAvatar(bottts, { seed: agent.name }).toString()} />
            </View>
            <View style={styles.searchResultContent}>
              <ThemedText style={styles.searchResultName}>{agent.name}</ThemedText>
              <ThemedText style={styles.searchResultRole}>{agent.role}</ThemedText>
            </View>
            <ThemedText style={styles.searchResultArrow}>›</ThemedText>
          </Pressable>
        ))}
      </View>
    );
  };

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
      <SearchResultsDropdown />

      {/* Expandable Filters Section */}
      {filtersOpen && (
        <View style={styles.filtersContent}>
          {/* Type Dropdown */}
          <DropdownButton
            label='Type'
            value={selectedType}
            onPress={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
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
  dropdownMenuContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    overflow: 'hidden',
    marginHorizontal: 0,
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
  searchResultsContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    overflow: 'hidden',
    marginTop: -8,
    maxHeight: 300,
  },
  searchResultItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  searchResultAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_BORDER_RADIUS,
    overflow: 'hidden',
    flexShrink: 0,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchResultRole: {
    color: '#888',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
  searchResultArrow: {
    color: '#4D7CFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});
