import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

const MENU_ITEMS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'location-outline', label: 'Shipping Address' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export function ProfileMenu() {
  const { colors } = useClothingTheme();

  return (
    <View style={[styles.menu, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {MENU_ITEMS.map((item, index) => (
        <Pressable
          key={item.label}
          style={[
            styles.row,
            index < MENU_ITEMS.length - 1 && {
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ]}>
          <Ionicons name={item.icon} size={22} color={colors.text} />
          <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
});
