import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppNavigation } from '@/app/_layout';
import {
  ProfileHeader,
  ProfileMenu,
  ScreenContainer,
  ThemeToggle,
} from '@/components/clothing';
import { useClothingTheme } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useClothingTheme();

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <ProfileHeader />
        <ThemeToggle />
        <Pressable
          onPress={() => router.push('/favorites')}
          style={[styles.favLink, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="heart" size={22} color={colors.text} />
          <Text style={[styles.favText, { color: colors.text }]}>My Favorites</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
        <ProfileMenu />
      </ScreenContainer>
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  favLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  favText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});
