import { AgentCard } from '@/components/agent-card';
import { AgentFilters } from '@/components/agent-filters';
import GifScrollView from '@/components/gif-scroll-view';
import { mockAgents } from '@/mocks/mocks';
import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';

export default function TabOneScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedType, setSelectedType] = useState('Wallets');
  const [selectedSort, setSelectedSort] = useState('24h');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState('');
  const [selectedProtection, setSelectedProtection] = useState('Degen');

  const filteredAgents = useMemo(() => {
    return mockAgents
      .filter((agent) => {
        const protectionMatch = agent.protectionLevel.includes(
          selectedProtection as 'Degen' | 'Moderate' | 'Guarded'
        );

        return protectionMatch;
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
  }, [selectedSort, selectedProtection]);

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
        renderItem={({ item }) => <AgentCard agent={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </GifScrollView>
  );
}
