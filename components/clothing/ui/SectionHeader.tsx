import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, subtitle, onSeeAll }: SectionHeaderProps) {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        ) : null}
      </View>
      {onSeeAll ? (
        <Pressable onPress={onSeeAll} style={styles.seeAll} hitSlop={8}>
          <Text style={[styles.seeAllText, { color: colors.textSecondary }]}>See all</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingLeft: Spacing.sm,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
