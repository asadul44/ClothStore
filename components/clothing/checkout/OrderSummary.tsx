import { StyleSheet, Text, View } from 'react-native';

import { formatPrice } from '@/constants/products';
import { useClothingTheme } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

type OrderSummaryProps = {
  itemCount: number;
  total: number;
  shipping?: number;
  discount?: number;
};

export function OrderSummary({
  itemCount,
  total,
  shipping = 0,
  discount = 0,
}: OrderSummaryProps) {
  const { colors } = useClothingTheme();

  const rows = [
    { label: `Total (${itemCount} items)`, value: formatPrice(total) },
    { label: 'Shipping Fee', value: formatPrice(shipping) },
    { label: 'Discount', value: formatPrice(discount) },
  ];

  return (
    <View style={styles.wrap}>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{row.label}</Text>
          <Text style={[styles.value, { color: colors.text }]}>{row.value}</Text>
        </View>
      ))}
      <View style={[styles.divider, { backgroundColor: colors.summaryDivider }]} />
      <View style={styles.row}>
        <Text style={[styles.subTotalLabel, { color: colors.text }]}>Sub Total</Text>
        <Text style={[styles.subTotalValue, { color: colors.text }]}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.xs,
  },
  subTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  subTotalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
