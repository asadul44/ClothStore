import { FlatList, StyleSheet, View } from 'react-native';

import { CompactProductCard } from '@/components/clothing/home/CompactProductCard';
import { SectionHeader } from '@/components/clothing/ui/SectionHeader';
import { getRecommendedProducts } from '@/constants/home-content';
import { Spacing } from '@/constants/clothing-theme';

export function RecommendedSection() {
  const products = getRecommendedProducts();

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Recommended"
        subtitle="Curated picks based on trending styles"
      />
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <CompactProductCard product={item} />}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.sm,
  },
  list: {
    paddingRight: Spacing.xl,
  },
});
