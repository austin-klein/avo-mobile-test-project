import ParallaxScrollView from '@/components/parallax-scroll-view';
import { renderAgentCard } from '@/components/render-agent-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { mockAgents } from '@/mocks/mocks';
import { FlatList, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#000' }}
      headerImage={
        <IconSymbol
          size={310}
          color='#808080'
          name='chevron.left.forwardslash.chevron.right'
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type='title'
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Agents
        </ThemedText>
      </ThemedView>
      <FlatList
        data={mockAgents}
        renderItem={({ item }) => renderAgentCard(item)}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
