import { FlatList, StyleSheet, View } from 'react-native';

import { CollectionCard } from '@/components/clothing/home/CollectionCard';
import { SectionHeader } from '@/components/clothing/ui/SectionHeader';
import { COLLECTIONS } from '@/constants/home-content';
import { Spacing } from '@/constants/clothing-theme';

export function CollectionSection() {
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Collections"
        subtitle="Shop by mood, season & style"
      />
      <FlatList
        data={COLLECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CollectionCard collection={item} />}
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
    marginTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  list: {
    paddingRight: Spacing.xl,
  },
});
