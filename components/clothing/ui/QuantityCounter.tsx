import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

type QuantityCounterProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  compact?: boolean;
  style?: ViewStyle;
};

export function QuantityCounter({
  value,
  onDecrease,
  onIncrease,
  compact = false,
  style,
}: QuantityCounterProps) {
  const { colors } = useClothingTheme();
  const buttonSize = compact ? 28 : 32;

  return (
    <View
      style={[
        styles.container,
        compact && styles.compact,
        { backgroundColor: colors.pillBackground, borderColor: colors.border },
        style,
      ]}>
      <Pressable
        onPress={onDecrease}
        style={[styles.circle, { width: buttonSize, height: buttonSize, borderColor: colors.border }]}>
        <Ionicons name="remove" size={16} color={colors.text} />
      </Pressable>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Pressable
        onPress={onIncrease}
        style={[styles.circle, { width: buttonSize, height: buttonSize, borderColor: colors.border }]}>
        <Ionicons name="add" size={16} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  compact: {
    gap: Spacing.sm,
  },
  circle: {
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
});
