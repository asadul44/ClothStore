import { StyleSheet, Text, View } from 'react-native';

import { ProfileAvatar } from '@/components/clothing/profile/ProfileAvatar';
import { useClothingTheme } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

export function ProfileHeader() {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.row}>
      <ProfileAvatar size={72} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>Albert Stevano</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>albert@clothing.store</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
  },
});
