import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatPrice } from '@/constants/products';
import { useClothingTheme, useStore } from '@/context/StoreContext';
import type { Product } from '@/types/product';
import { Radius, Spacing } from '@/constants/clothing-theme';

const CARD_WIDTH = 156;

type CompactProductCardProps = {
  product: Product;
};

export function CompactProductCard({ product }: CompactProductCardProps) {
  const router = useRouter();
  const { colors } = useClothingTheme();
  const { isFavorite, toggleFavorite } = useStore();
  const favorite = isFavorite(product.id);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.92 : 1, width: CARD_WIDTH }]}>
      <View style={[styles.imageWrap, { backgroundColor: colors.pillBackground }]}>
        <Image source={product.image} style={styles.image} contentFit="cover" transition={200} />
        <Pressable
          onPress={() => toggleFavorite(product.id)}
          hitSlop={8}
          style={[styles.favBtn, { backgroundColor: colors.primary }]}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={14}
            color={colors.primaryText}
          />
        </Pressable>
      </View>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {product.title}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
        {product.subtitle}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.price, { color: colors.text }]}>{formatPrice(product.price)}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={12} color={colors.star} />
          <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
            {product.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const COMPACT_CARD_WIDTH = CARD_WIDTH;

const styles = StyleSheet.create({
  card: {
    marginRight: Spacing.md,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 0.78,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
