import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import type { CollectionItem } from '@/types/home';
import { Radius, Spacing } from '@/constants/clothing-theme';

const CARD_WIDTH = 200;
const CARD_HEIGHT = 128;

type CollectionCardProps = {
  collection: CollectionItem;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  const router = useRouter();
  const { colors } = useClothingTheme();

  const openCollection = () => {
    const firstId = collection.productIds[0];
    if (firstId) router.push(`/product/${firstId}`);
  };

  return (
    <Pressable
      onPress={openCollection}
      style={({ pressed }) => [
        styles.card,
        { width: CARD_WIDTH, height: CARD_HEIGHT, opacity: pressed ? 0.92 : 1 },
      ]}>
      <Image source={collection.image} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{collection.title}</Text>
        <Text style={styles.subtitle}>{collection.subtitle}</Text>
        <View style={[styles.countPill, { backgroundColor: colors.surface }]}>
          <Text style={[styles.countText, { color: colors.text }]}>
            {collection.itemCount} items
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const COLLECTION_CARD_WIDTH = CARD_WIDTH;

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.md,
    gap: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  countPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
