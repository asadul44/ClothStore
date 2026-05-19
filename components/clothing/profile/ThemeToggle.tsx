import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useClothingTheme, useStore } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

export function ThemeToggle() {
  const { colors, theme } = useClothingTheme();
  const { toggleTheme } = useStore();
  const isDark = theme === 'dark';

  return (
    <Pressable
      onPress={toggleTheme}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.left}>
        <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color={colors.text} />
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {isDark ? 'Dark mode' : 'Light mode'}
          </Text>
        </View>
      </View>
      <View style={[styles.pill, { backgroundColor: colors.pillBackground }]}>
        <Text style={[styles.pillText, { color: colors.text }]}>Switch</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
