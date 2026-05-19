import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AddToCartBar,
  ProductHero,
  ProductInfo,
  SizeColorSelector,
} from '@/components/clothing';
import { getProductById } from '@/constants/products';
import { useClothingTheme, useStore } from '@/context/StoreContext';
import { useResponsive } from '@/hooks/use-responsive';
import { Spacing } from '@/constants/clothing-theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useClothingTheme();
  const { addToCart } = useStore();
  const { horizontalPadding, maxContentWidth } = useResponsive();

  const product = getProductById(id ?? '');

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[2] ?? 'L');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '#D4D4D4');

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    Alert.alert('Added to cart', `${product.title} is in your cart.`);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding, maxWidth: maxContentWidth, alignSelf: 'center', width: '100%' },
        ]}>
        <ProductHero product={product} onBack={() => router.back()} />
        <ProductInfo product={product} quantity={quantity} onQuantityChange={setQuantity} />
        <SizeColorSelector
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeChange={setSelectedSize}
          onColorChange={setSelectedColor}
        />
        <View style={styles.spacer} />
      </ScrollView>
      <AddToCartBar
        price={product.price * quantity}
        originalPrice={product.originalPrice ? product.originalPrice * quantity : undefined}
        onPress={handleAddToCart}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    paddingTop: Spacing.lg,
    gap: Spacing.xl,
    paddingBottom: 120,
  },
  spacer: {
    height: Spacing.lg,
  },
});
