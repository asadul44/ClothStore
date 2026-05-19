import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { QuantityCounter } from '@/components/clothing/ui/QuantityCounter';
import { formatPrice, getProductById } from '@/constants/products';
import { useClothingTheme } from '@/context/StoreContext';
import type { CartItem } from '@/types/product';
import { Radius, Spacing } from '@/constants/clothing-theme';

type CartItemRowProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function CartItemRow({ item, onIncrease, onDecrease }: CartItemRowProps) {
  const { colors } = useClothingTheme();
  const product = getProductById(item.productId);

  if (!product) return null;

  return (
    <View style={[styles.row, { backgroundColor: colors.surface }]}>
      <Image source={product.image} style={styles.image} contentFit="cover" />
      <View style={styles.details}>
        <View style={styles.top}>
          <View style={styles.textBlock}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {product.title}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
              {product.subtitle}
            </Text>
            <Text style={[styles.price, { color: colors.text }]}>{formatPrice(product.price)}</Text>
          </View>
          <Pressable hitSlop={8}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
          </Pressable>
        </View>
        <View style={styles.bottom}>
          <QuantityCounter
            value={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            compact
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: Radius.md,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
  },
});
