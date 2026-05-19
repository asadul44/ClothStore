import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { QuantityCounter } from '@/components/clothing/ui/QuantityCounter';
import { StarRating } from '@/components/clothing/ui/StarRating';
import { useClothingTheme } from '@/context/StoreContext';
import type { Product } from '@/types/product';
import { Spacing } from '@/constants/clothing-theme';

type ProductInfoProps = {
  product: Product;
  quantity: number;
  onQuantityChange: (value: number) => void;
};

export function ProductInfo({ product, quantity, onQuantityChange }: ProductInfoProps) {
  const { colors } = useClothingTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.block}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        <QuantityCounter
          value={quantity}
          onDecrease={() => onQuantityChange(Math.max(1, quantity - 1))}
          onIncrease={() => onQuantityChange(quantity + 1)}
          compact
        />
      </View>
      <StarRating rating={product.rating} reviews={product.reviews} />
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={expanded ? undefined : 3}>
        {product.description}
      </Text>
      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text style={[styles.readMore, { color: colors.text }]}>
          {expanded ? 'Show Less' : 'Read More...'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '700',
  },
});
