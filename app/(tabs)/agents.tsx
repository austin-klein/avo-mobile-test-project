import GifScrollView from '@/components/gif-scroll-view';
import { renderAgentCard } from '@/components/render-agent-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { mockAgents } from '@/mocks/mocks';
import { FlatList, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
    <GifScrollView
      title={
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type='title'
            style={{
              fontFamily: Fonts.rounded,
            }}>
            Agents
          </ThemedText>
        </ThemedView>
      }
      backgroundGif='https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODdmdjI3NHpidG0wdW10Z2NlZGxsYm84eGIwemR5dzZpODk0cGV4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VXhUTVzvNmlRm/giphy.gif'>
      <FlatList
        data={mockAgents}
        renderItem={({ item }) => renderAgentCard(item)}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </GifScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'transparent',
  },
});
