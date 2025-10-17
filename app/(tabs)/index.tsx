import GifScrollView from '@/components/gif-scroll-view';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <GifScrollView
      title={
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='title'>Home</ThemedText>
          <HelloWave />
        </ThemedView>
      }
      backgroundGif='https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODdmdjI3NHpidG0wdW10Z2NlZGxsYm84eGIwemR5dzZpODk0cGV4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VXhUTVzvNmlRm/giphy.gif'>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type='subtitle'>Welcome to your app!</ThemedText>
      </ThemedView>
    </GifScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    backgroundColor: 'transparent',
  },
});
