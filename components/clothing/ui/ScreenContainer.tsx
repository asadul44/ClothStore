import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useClothingTheme } from '@/context/StoreContext';
import { useResponsive } from '@/hooks/use-responsive';
import { Spacing } from '@/constants/clothing-theme';

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  bottomInset?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

export function ScreenContainer({
  children,
  scroll = true,
  bottomInset = 100,
  style,
  contentStyle,
}: ScreenContainerProps) {
  const { colors } = useClothingTheme();
  const { horizontalPadding, maxContentWidth } = useResponsive();

  const content = (
    <View
      style={[
        styles.inner,
        { paddingHorizontal: horizontalPadding, maxWidth: maxContentWidth, alignSelf: 'center', width: '100%' },
        contentStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }, style]} edges={['top']}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottomInset }}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  inner: {
    paddingTop: Spacing.lg,
    gap: Spacing.xl,
  },
});
