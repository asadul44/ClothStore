import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRouter, usePathname } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useClothingTheme, useStore } from '@/context/StoreContext';
import { Radius, Spacing } from '@/constants/clothing-theme';

type TabName = 'index' | 'search' | 'cart' | 'profile';

const TABS: { name: TabName; href: '/(tabs)' | '/(tabs)/search' | '/(tabs)/cart' | '/(tabs)/profile'; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'index', href: '/(tabs)', icon: 'home-outline', activeIcon: 'home' },
  { name: 'search', href: '/(tabs)/search', icon: 'search-outline', activeIcon: 'search' },
  { name: 'cart', href: '/(tabs)/cart', icon: 'bag-outline', activeIcon: 'bag' },
  { name: 'profile', href: '/(tabs)/profile', icon: 'person-outline', activeIcon: 'person' },
];

function NavigationBar({
  activeTab,
  onTabPress,
}: {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}) {
  const { colors } = useClothingTheme();
  const { getCartCount } = useStore();
  const insets = useSafeAreaInsets();
  const cartCount = getCartCount();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
      <View style={[styles.bar, { backgroundColor: colors.navBackground }]}>
        {TABS.map((tab) => {
          const focused = activeTab === tab.name;
          const showBadge = tab.name === 'cart' && cartCount > 0;

          return (
            <Pressable
              key={tab.name}
              onPress={() => onTabPress(tab.name)}
              style={styles.tab}
              hitSlop={12}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={focused ? tab.activeIcon : tab.icon}
                  size={24}
                  color={focused ? colors.navIconActive : colors.navIconInactive}
                />
                {showBadge ? <View style={[styles.badge, { backgroundColor: colors.badge }]} /> : null}
              </View>
              {focused ? <View style={[styles.dot, { backgroundColor: colors.navIconActive }]} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function getActiveTab(pathname: string): TabName {
  if (pathname.includes('/search')) return 'search';
  if (pathname.includes('/cart')) return 'cart';
  if (pathname.includes('/profile')) return 'profile';
  return 'index';
}

/** Standalone bottom nav — import on screens from `app/_layout` */
export function AppNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  const onTabPress = (tab: TabName) => {
    const target = TABS.find((t) => t.name === tab);
    if (target) router.push(target.href);
  };

  return <NavigationBar activeTab={activeTab} onTabPress={onTabPress} />;
}

/** Tab bar adapter for expo-router Tabs layout */
export function TabBarNavigation({ state, navigation }: BottomTabBarProps) {
  const activeTab = (state.routes[state.index]?.name as TabName) ?? 'index';

  const onTabPress = (tab: TabName) => {
    navigation.navigate(tab);
  };

  return <NavigationBar activeTab={activeTab} onTabPress={onTabPress} />;
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.pill,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    gap: Spacing.xs,
  },
  iconWrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
});
