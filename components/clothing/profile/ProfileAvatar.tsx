import { StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';

type ProfileAvatarProps = {
  size?: number;
  initials?: string;
};

export function ProfileAvatar({ size = 48, initials = 'AS' }: ProfileAvatarProps) {
  const { colors } = useClothingTheme();

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.pillBackground,
          borderColor: colors.border,
        },
      ]}>
      <Text style={[styles.initials, { color: colors.text, fontSize: size * 0.35 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  initials: {
    fontWeight: '700',
  },
});
