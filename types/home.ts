import type { ImageSourcePropType } from 'react-native';

export type PromoSlide = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: ImageSourcePropType;
  productId: string;
  accent?: string;
};

export type CollectionItem = {
  id: string;
  title: string;
  subtitle: string;
  itemCount: number;
  image: ImageSourcePropType;
  productIds: string[];
};
