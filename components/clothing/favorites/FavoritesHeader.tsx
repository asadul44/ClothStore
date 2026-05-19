import { StyleSheet, Text, View } from 'react-native';

import { useClothingTheme, useStore } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

export function FavoritesHeader() {
  const { colors } = useClothingTheme();
  const { favoriteProducts } = useStore();

  return (
    <View style={styles.block}>
      <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {favoriteProducts.length} saved {favoriteProducts.length === 1 ? 'item' : 'items'}
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
