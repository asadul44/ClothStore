import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/clothing/ui/PrimaryButton';
import { formatPrice } from '@/constants/products';
import { Spacing } from '@/constants/clothing-theme';
import { useClothingTheme } from '@/context/StoreContext';

type AddToCartBarProps = {
  price: number;
  originalPrice?: number;
  onPress: () => void;
};

export function AddToCartBar({ price, originalPrice, onPress }: AddToCartBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useClothingTheme();

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, Spacing.lg),
          backgroundColor: colors.background,
        },
      ]}>
      <PrimaryButton
        label={`Add to Cart  |  ${formatPrice(price)}`}
        icon="cart-outline"
        strikethrough={originalPrice ? formatPrice(originalPrice) : undefined}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
});
