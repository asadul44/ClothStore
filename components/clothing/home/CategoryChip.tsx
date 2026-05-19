import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import type { CategoryOption } from '@/types/product';
import { Radius, Spacing } from '@/constants/clothing-theme';

type CategoryChipProps = {
  category: CategoryOption;
  selected: boolean;
  onPress: () => void;
};

export function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  const { colors } = useClothingTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}>
      <Ionicons
        name={category.icon}
        size={18}
        color={selected ? colors.primaryText : colors.text}
      />
      <Text style={[styles.label, { color: selected ? colors.primaryText : colors.text }]}>
        {category.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
