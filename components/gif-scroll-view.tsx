import type { PropsWithChildren, ReactNode } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{
  title?: ReactNode;
  backgroundGif?: string;
}>;

export default function GifScrollView({ children, title, backgroundGif }: Props) {
  return (
    <View style={styles.container}>
      {backgroundGif && (
        <Image
          source={{ uri: backgroundGif }}
          style={[StyleSheet.absoluteFill, styles.backgroundImage]}
          resizeMode='cover'
        />
      )}
      <ScrollView style={styles.scrollView} scrollEventThrottle={16}>
        {title && <View style={styles.header}>{title}</View>}
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    paddingTop: 64,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
