import { ScrollView, StyleSheet } from 'react-native';

import { CategoryChip } from '@/components/clothing/home/CategoryChip';
import { CATEGORIES } from '@/constants/products';
import { useStore } from '@/context/StoreContext';

export function CategoryList() {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {CATEGORIES.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          selected={selectedCategory === category.id}
          onPress={() => setSelectedCategory(category.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingRight: 8,
  },
});
