import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

export function ShippingCard() {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.heading, { color: colors.text }]}>Shipping Information</Text>
      <View style={[styles.card, { backgroundColor: colors.pillBackground }]}>
        <View style={[styles.visaBadge, { backgroundColor: colors.visa }]}>
          <Text style={styles.visaText}>VISA</Text>
        </View>
        <Text style={[styles.cardNumber, { color: colors.text }]}>**** **** **** 2143</Text>
        <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.md,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  visaBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  visaText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  cardNumber: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
