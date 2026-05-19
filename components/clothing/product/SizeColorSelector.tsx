import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import type { Product } from '@/types/product';
import { Radius, Spacing } from '@/constants/clothing-theme';

type SizeColorSelectorProps = {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
};

export function SizeColorSelector({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: SizeColorSelectorProps) {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={[styles.label, { color: colors.text }]}>Choose Size</Text>
        <View style={styles.options}>
          {product.sizes.map((size) => {
            const selected = size === selectedSize;
            return (
              <Pressable
                key={size}
                onPress={() => onSizeChange(size)}
                style={[
                  styles.sizeChip,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}>
                <Text style={{ color: selected ? colors.primaryText : colors.textSecondary, fontWeight: '600' }}>
                  {size}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.column}>
        <Text style={[styles.label, { color: colors.text }]}>Color</Text>
        <View style={styles.options}>
          {product.colors.map((color) => {
            const selected = color === selectedColor;
            return (
              <Pressable
                key={color}
                onPress={() => onColorChange(color)}
                style={[
                  styles.colorSwatch,
                  {
                    backgroundColor: color,
                    borderColor: selected ? colors.text : colors.border,
                    borderWidth: selected ? 2.5 : 1,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  column: {
    flex: 1,
    gap: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sizeChip: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatch: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
  },
});
