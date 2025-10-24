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
import { Colors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS, AVATAR, FONT_SIZE, FONT_WEIGHT } from '@/constants/dimensions';

interface FilterProps {
  onTypeChange: (type: string) => void;
  onProtectionChange: (protection: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
}

const TYPE_OPTIONS = ['Wallets', 'Indexes', 'Reasoning Agents'];
const PROTECTION_OPTIONS = ['Degen', 'Moderate', 'Guarded'];
const SORT_OPTIONS = ['24h', '7d', '1M'];

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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.lighter,
  },
  filterButtonText: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  filtersContent: {
    gap: SPACING.md,
  },
  searchBox: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.neutral.darkCardAlt,
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.medium,
  },
  dropdownMenuContainer: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.background.translucent,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  dropdownMenuItem: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
  },
  dropdownMenuItemSelected: {
    backgroundColor: Colors.primary.light,
  },
  dropdownMenuText: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.medium,
  },
  dropdownMenuTextSelected: {
    color: Colors.primary.main,
    fontWeight: FONT_WEIGHT.bold,
  },
  searchResultsContainer: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    backgroundColor: Colors.background.translucent,
    overflow: 'hidden',
    marginTop: -SPACING.md,
    maxHeight: 300,
  },
  searchResultItem: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.lighter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  searchResultAvatar: {
    width: AVATAR.xs,
    height: AVATAR.xs,
    borderRadius: AVATAR.borderRadius.xs,
    overflow: 'hidden',
    flexShrink: 0,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultName: {
    color: Colors.neutral.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
  },
  searchResultRole: {
    color: Colors.neutral.gray500,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    marginTop: SPACING.xs,
  },
  searchResultArrow: {
    color: Colors.primary.main,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    marginLeft: SPACING.lg,
  },
});
