import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { IconCircleButton } from '@/components/clothing/ui/IconCircleButton';
import { useStore } from '@/context/StoreContext';
import type { Product } from '@/types/product';
import { Radius, Spacing } from '@/constants/clothing-theme';

type ProductHeroProps = {
  product: Product;
  onBack: () => void;
};

export function ProductHero({ product, onBack }: ProductHeroProps) {
  const { isFavorite, toggleFavorite } = useStore();
  const favorite = isFavorite(product.id);

  return (
    <View style={styles.wrap}>
      <Image source={product.image} style={styles.image} contentFit="cover" />
      <IconCircleButton name="chevron-back" onPress={onBack} style={styles.back} />
      <IconCircleButton
        name={favorite ? 'heart' : 'heart-outline'}
        onPress={() => toggleFavorite(product.id)}
        style={styles.fav}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: 0.85,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  back: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
  },
  fav: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
  },
});
