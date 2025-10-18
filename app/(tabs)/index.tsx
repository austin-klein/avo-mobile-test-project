import { AgentFilters } from '@/components/agent-filters';
import GifScrollView from '@/components/gif-scroll-view';
import { renderAgentCard } from '@/components/render-agent-view';
import { mockAgents } from '@/mocks/mocks';
import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';

export default function TabOneScreen() {
  const [selectedType, setSelectedType] = useState('Wallets');
  const [selectedSort, setSelectedSort] = useState('24h');
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProtection, setSelectedProtection] = useState('Degen');

  const filteredAgents = useMemo(() => {
    return mockAgents
      .filter((agent) => {
        // Filter by type - map filter options to agent roles
        let typeMatch = true;
        if (selectedType === 'Wallets') {
          typeMatch = agent.role.toLowerCase().includes('wallet');
        } else if (selectedType === 'Traders') {
          typeMatch = agent.role.toLowerCase().includes('trader');
        } else if (selectedType === 'Funds') {
          typeMatch = agent.role.toLowerCase().includes('fund');
        }

        // Filter by search text
        const searchMatch =
          searchText === '' || agent.name.toLowerCase().includes(searchText.toLowerCase());

        return typeMatch && searchMatch;
      })
      .sort((a, b) => {
        // Sort by selected timeframe
        if (selectedSort === '24h') {
          return parseFloat(b.change24h) - parseFloat(a.change24h);
        } else if (selectedSort === '7d') {
          return parseFloat(b.change7d) - parseFloat(a.change7d);
        }
        return 0;
      });
  }, [selectedType, selectedSort, searchText]);

  return (
    <GifScrollView backgroundGif='https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODdmdjI3NHpidG0wdW10Z2NlZGxsYm84eGIwemR5dzZpODk0cGV4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VXhUTVzvNmlRm/giphy.gif'>
      <AgentFilters
        onTypeChange={setSelectedType}
        onProtectionChange={setSelectedProtection}
        onSortChange={setSelectedSort}
        onSearchChange={setSearchText}
      />

      <FlatList
        data={filteredAgents}
        renderItem={({ item }) => renderAgentCard(item)}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </GifScrollView>
  );
}
