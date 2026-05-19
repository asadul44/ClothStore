import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Radius } from '@/constants/clothing-theme';

type IconCircleButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
  variant?: 'surface' | 'ghost' | 'dark';
};

export function IconCircleButton({
  name,
  onPress,
  size = 20,
  style,
  variant = 'surface',
}: IconCircleButtonProps) {
  const { colors } = useClothingTheme();

  const backgroundColor =
    variant === 'dark' ? colors.primary : variant === 'ghost' ? 'transparent' : colors.surface;

  const iconColor = variant === 'dark' ? colors.primaryText : colors.text;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
      hitSlop={8}>
      <Ionicons name={name} size={size} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
