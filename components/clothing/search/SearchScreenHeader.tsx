import { StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

export function SearchScreenHeader() {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.block}>
      <Text style={[styles.title, { color: colors.text }]}>Search</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Find your next favorite outfit
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: Spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
  },
});
