import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppNavigation } from '@/app/_layout';
import {
  CartItemRow,
  PrimaryButton,
  ScreenContainer,
} from '@/components/clothing';
import { formatPrice } from '@/constants/products';
import { useClothingTheme, useStore } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

export default function CartScreen() {
  const router = useRouter();
  const { colors } = useClothingTheme();
  const { cart, updateCartQuantity, getCartTotal, getCartCount } = useStore();
  const total = getCartTotal();
  const count = getCartCount();

  return (
    <View style={styles.root}>
    <ScreenContainer bottomInset={120}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Cart</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {count} {count === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <View style={styles.list}>
        {cart.map((item) => (
          <CartItemRow
            key={`${item.productId}-${item.size}`}
            item={item}
            onIncrease={() => updateCartQuantity(item.productId, item.quantity + 1)}
            onDecrease={() => updateCartQuantity(item.productId, item.quantity - 1)}
          />
        ))}
      </View>

      <View style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total</Text>
        <Text style={[styles.totalValue, { color: colors.text }]}>{formatPrice(total)}</Text>
      </View>

      <PrimaryButton label="Go to Checkout" onPress={() => router.push('/checkout')} />
    </ScreenContainer>
    <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    gap: Spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
  },
  list: {
    gap: Spacing.md,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
  },
  totalLabel: {
    fontSize: 15,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});
