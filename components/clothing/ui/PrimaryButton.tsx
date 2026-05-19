import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  strikethrough?: string;
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, icon, strikethrough, style }: PrimaryButtonProps) {
  const { colors } = useClothingTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 },
        style,
      ]}>
      {icon ? <Ionicons name={icon} size={20} color={colors.primaryText} /> : null}
      <Text style={[styles.label, { color: colors.primaryText }]}>{label}</Text>
      {strikethrough ? (
        <Text style={[styles.strike, { color: colors.textMuted }]}>{strikethrough}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.pill,
    minHeight: 56,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  strike: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginLeft: Spacing.xs,
  },
});
