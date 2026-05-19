import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatPrice } from '@/constants/products';
import { useClothingTheme, useStore } from '@/context/StoreContext';
import type { Product } from '@/types/product';
import { Radius, Spacing } from '@/constants/clothing-theme';

export type ProductCardSize = 'tall' | 'medium' | 'short';

const IMAGE_ASPECT: Record<ProductCardSize, number> = {
  tall: 0.62,
  medium: 0.74,
  short: 0.9,
};

type ProductCardProps = {
  product: Product;
  size?: ProductCardSize;
};

export function ProductCard({ product, size = 'medium' }: ProductCardProps) {
  const router = useRouter();
  const { colors } = useClothingTheme();
  const { isFavorite, toggleFavorite } = useStore();
  const favorite = isFavorite(product.id);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.92 : 1 }]}>
      <View
        style={[
          styles.imageWrap,
          { backgroundColor: colors.pillBackground, aspectRatio: IMAGE_ASPECT[size] },
        ]}>
        <Image source={product.image} style={styles.image} contentFit="cover" transition={200} />
        <Pressable
          onPress={() => toggleFavorite(product.id)}
          hitSlop={10}
          style={[styles.favBtn, { backgroundColor: colors.primary }]}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={16}
            color={colors.primaryText}
          />
        </Pressable>
      </View>

      <View style={styles.meta}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
          {product.subtitle}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.text }]}>{formatPrice(product.price)}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={colors.star} />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {product.rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    marginTop: Spacing.md,
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
