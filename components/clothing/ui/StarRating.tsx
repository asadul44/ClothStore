import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { useClothingTheme } from '@/context/StoreContext';
import { Spacing } from '@/constants/clothing-theme';

type StarRatingProps = {
  rating: number;
  reviews?: number;
  showReviews?: boolean;
};

export function StarRating({ rating, reviews, showReviews = true }: StarRatingProps) {
  const { colors } = useClothingTheme();

  return (
    <View style={styles.row}>
      <Ionicons name="star" size={14} color={colors.star} />
      <Text style={[styles.rating, { color: colors.text }]}>{rating.toFixed(1)}</Text>
      {showReviews && reviews !== undefined ? (
        <Text style={[styles.reviews, { color: colors.accent }]}>
          ({reviews.toLocaleString()} reviews)
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 13,
  },
});
