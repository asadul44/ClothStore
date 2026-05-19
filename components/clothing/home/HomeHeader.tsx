import { StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';
import { ProfileAvatar } from '@/components/clothing/profile/ProfileAvatar';

export function HomeHeader() {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>Hello, Welcome 👋</Text>
        <Text style={[styles.name, { color: colors.text }]}>Albert Stevano</Text>
      </View>
      <ProfileAvatar size={48} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    gap: Spacing.xs,
    flex: 1,
  },
  greeting: {
    fontSize: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
});
