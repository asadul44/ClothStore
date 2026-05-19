import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CartItemRow,
  CheckoutHeader,
  OrderSummary,
  PrimaryButton,
  ScreenContainer,
  ShippingCard,
} from '@/components/clothing';
import { useStore } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cart, updateCartQuantity, getCartTotal, getCartCount } = useStore();
  const total = getCartTotal();
  const count = getCartCount();

  return (
    <ScreenContainer scroll bottomInset={insets.bottom + 100}>
      <CheckoutHeader onBack={() => router.back()} />

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

      <ShippingCard />
      <OrderSummary itemCount={count} total={total} />

      <PrimaryButton
        label="Pay"
        onPress={() => Alert.alert('Payment', 'Thank you! Your order has been placed.')}
        style={styles.payBtn}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.md,
  },
  payBtn: {
    marginTop: Spacing.md,
  },
});
