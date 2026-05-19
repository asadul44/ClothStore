import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useClothingTheme, useStore } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

type SearchBarProps = {
  editable?: boolean;
  autoFocus?: boolean;
};

export function SearchBar({ editable = true, autoFocus = false }: SearchBarProps) {
  const { colors } = useClothingTheme();
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.inputWrap,
          { backgroundColor: colors.inputBackground, borderColor: colors.border },
        ]}>
        <Ionicons name="search-outline" size={20} color={colors.textMuted} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search clothes..."
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { color: colors.text }]}
          editable={editable}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
      </View>
      <Pressable
        style={[styles.filterBtn, { backgroundColor: colors.primary }]}
        hitSlop={8}>
        <Ionicons name="options-outline" size={22} color={colors.primaryText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
