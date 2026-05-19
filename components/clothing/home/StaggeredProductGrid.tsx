import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { ProductCard, type ProductCardSize } from '@/components/clothing/home/ProductCard';
import { useClothingTheme } from '@/context/StoreContext';
import { useResponsive } from '@/hooks/use-responsive';
import type { Product } from '@/types/product';
import { Spacing } from '@/constants/clothing-theme';

const COLUMN_GAP = Spacing.lg;
const ROW_GAP = Spacing.xxl;
const STAGGER_OFFSET = 52;

const SIZE_PATTERN: ProductCardSize[] = ['tall', 'medium', 'short', 'medium'];

function getCardSize(index: number): ProductCardSize {
  return SIZE_PATTERN[index % SIZE_PATTERN.length];
}

type StaggeredProductGridProps = {
  products: Product[];
  emptyMessage?: string;
};

export function StaggeredProductGrid({
  products,
  emptyMessage = 'No items match your search.',
}: StaggeredProductGridProps) {
  const { colors } = useClothingTheme();
  const { width } = useWindowDimensions();
  const { horizontalPadding } = useResponsive();

  if (products.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{emptyMessage}</Text>
      </View>
    );
  }

  const cardWidth = (width - horizontalPadding * 2 - COLUMN_GAP) / 2;
  const leftColumn = products.filter((_, index) => index % 2 === 0);
  const rightColumn = products.filter((_, index) => index % 2 === 1);

  return (
    <View style={[styles.grid, { gap: COLUMN_GAP }]}>
      <View style={[styles.column, { width: cardWidth, gap: ROW_GAP }]}>
        {leftColumn.map((product, index) => {
          const globalIndex = index * 2;
          return (
            <ProductCard
              key={product.id}
              product={product}
              size={getCardSize(globalIndex)}
            />
          );
        })}
      </View>

      <View style={[styles.column, { width: cardWidth, gap: ROW_GAP, marginTop: STAGGER_OFFSET }]}>
        {rightColumn.map((product, index) => {
          const globalIndex = index * 2 + 1;
          return (
            <ProductCard
              key={product.id}
              product={product}
              size={getCardSize(globalIndex)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
  },
  empty: {
    paddingVertical: Spacing.xxxl,
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: Spacing.xxl,
  },
});
