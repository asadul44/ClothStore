import type { ImageSourcePropType } from 'react-native';

export type ProductCategory = 'All Items' | 'Dress' | 'T-Shirt' | 'Jeans';

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'All Items'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: ImageSourcePropType;
  description: string;
  sizes: string[];
  colors: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

export type CategoryOption = {
  id: ProductCategory;
  label: ProductCategory;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
};
