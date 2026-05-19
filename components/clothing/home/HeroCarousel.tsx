import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

import { PROMO_SLIDES } from '@/constants/home-content';
import { useClothingTheme } from '@/context/StoreContext';
import { useResponsive } from '@/hooks/use-responsive';
import type { PromoSlide } from '@/types/home';
import { Radius, Spacing } from '@/constants/clothing-theme';

const SLIDE_INTERVAL = 4500;
const SLIDE_ASPECT = 0.52;
const DOT_SIZE = 7;
const DOT_ACTIVE_WIDTH = 22;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<PromoSlide>);

type CarouselDotProps = {
  index: number;
  scrollX: SharedValue<number>;
  slideStride: number;
  inactiveColor: string;
  activeColor: string;
};

function CarouselDot({ index, scrollX, slideStride, inactiveColor, activeColor }: CarouselDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * slideStride, index * slideStride, (index + 1) * slideStride];

    return {
      width: interpolate(scrollX.value, inputRange, [DOT_SIZE, DOT_ACTIVE_WIDTH, DOT_SIZE], Extrapolation.CLAMP),
      backgroundColor: interpolateColor(scrollX.value, inputRange, [inactiveColor, activeColor, inactiveColor]),
      opacity: interpolate(scrollX.value, inputRange, [0.45, 1, 0.45], Extrapolation.CLAMP),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export function HeroCarousel() {
  const router = useRouter();
  const { colors } = useClothingTheme();
  const { width } = useWindowDimensions();
  const { horizontalPadding } = useResponsive();
  const listRef = useRef<FlatList<PromoSlide>>(null);
  const activeIndexRef = useRef(0);
  const scrollX = useSharedValue(0);

  const slideWidth = width - horizontalPadding * 2;
  const slideHeight = slideWidth * SLIDE_ASPECT;
  const slideStride = slideWidth + Spacing.md;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        activeIndexRef.current = viewableItems[0].index;
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeIndexRef.current + 1) % PROMO_SLIDES.length;
      activeIndexRef.current = next;
      listRef.current?.scrollToIndex({ index: next, animated: true });
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    activeIndexRef.current = Math.round(e.nativeEvent.contentOffset.x / slideStride);
  };

  const renderSlide = ({ item }: { item: PromoSlide }) => (
    <Pressable
      onPress={() => router.push(`/product/${item.productId}`)}
      style={[styles.slide, { width: slideWidth, height: slideHeight }]}>
      <Image source={item.image} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
      <View style={styles.overlayTop} />
      <View style={styles.overlayBottom} />
      <View style={styles.content}>
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.badgeText, { color: colors.primaryText }]}>Featured</Text>
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        <View style={[styles.cta, { backgroundColor: colors.surface }]}>
          <Text style={[styles.ctaText, { color: colors.text }]}>{item.cta}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.wrap}>
      <AnimatedFlatList
        ref={listRef}
        data={PROMO_SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        nestedScrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={slideStride}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: slideStride,
          offset: slideStride * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => listRef.current?.scrollToIndex({ index: info.index, animated: true }), 100);
        }}
      />
      <View style={styles.dots}>
        {PROMO_SLIDES.map((slide, index) => (
          <CarouselDot
            key={slide.id}
            index={index}
            scrollX={scrollX}
            slideStride={slideStride}
            inactiveColor={colors.border}
            activeColor={colors.primary}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.md,
  },
  listContent: {
    paddingRight: Spacing.md,
  },
  slide: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  overlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  overlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  content: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.lg,
    gap: Spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  slideTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  cta: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    marginTop: Spacing.xs,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: DOT_SIZE,
    borderRadius: Radius.pill,
  },
});
