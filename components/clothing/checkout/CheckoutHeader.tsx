import { StyleSheet, Text, View } from 'react-native';

import { IconCircleButton } from '@/components/clothing/ui/IconCircleButton';
import { useClothingTheme } from '@/context/StoreContext';

type CheckoutHeaderProps = {
  onBack: () => void;
};

export function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.row}>
      <IconCircleButton name="chevron-back" onPress={onBack} variant="ghost" />
      <Text style={[styles.title, { color: colors.text }]}>Checkout</Text>
      <IconCircleButton name="menu-outline" variant="ghost" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
