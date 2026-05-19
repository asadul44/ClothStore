import { StyleSheet, View } from 'react-native';

import { ProductGrid } from '@/components/clothing/home/ProductGrid';
import { SectionHeader } from '@/components/clothing/ui/SectionHeader';
import { Spacing } from '@/constants/clothing-theme';

export function DiscoverSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Discover" subtitle="Explore our latest arrivals" />
      <ProductGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.sm,
  },
});
