import type { CategoryOption, Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Modern Light Clothes',
    subtitle: 'T-Shirt',
    category: 'T-Shirt',
    price: 212.99,
    originalPrice: 250.99,
    rating: 5.0,
    reviews: 7932,
    image: require('@/assets/images/clothing/Product1.png'),
    description:
      'Its simple and elegant shape makes it perfect for those of you who like minimalist clothes. Suitable for daily wear and casual outings.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#D4D4D4', '#525252', '#171717'],
  },
  {
    id: '2',
    title: 'Light Dress Bless',
    subtitle: 'Dress modern',
    category: 'Dress',
    price: 212.99,
    originalPrice: 290.99,
    rating: 5.0,
    reviews: 5421,
    image: require('@/assets/images/clothing/Product2.png'),
    description:
      'A flowing modern dress with a clean silhouette. Lightweight fabric keeps you comfortable from day to evening.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#E8E8E8', '#9CA3AF', '#1F2937'],
  },
  {
    id: '3',
    title: 'Urban Denim Fit',
    subtitle: 'Jeans',
    category: 'Jeans',
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.8,
    reviews: 3180,
    image: require('@/assets/images/clothing/Product3.png'),
    description:
      'Tailored straight-leg jeans with a soft stretch finish. Pairs effortlessly with tees, shirts, and sneakers.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#93C5FD', '#3B82F6', '#1E3A8A'],
  },
  {
    id: '4',
    title: 'Classic Evening Dress',
    subtitle: 'Dress modern',
    category: 'Dress',
    price: 245.99,
    originalPrice: 310.99,
    rating: 4.9,
    reviews: 4210,
    image: require('@/assets/images/clothing/Product4.png'),
    description:
      'Elegant evening dress with refined draping. Designed for events where you want a polished, confident look.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F5F5F5', '#737373', '#0A0A0A'],
  },
];

export const CATEGORIES: CategoryOption[] = [
  { id: 'All Items', label: 'All Items', icon: 'grid-outline' },
  { id: 'Dress', label: 'Dress', icon: 'shirt-outline' },
  { id: 'T-Shirt', label: 'T-Shirt', icon: 'body-outline' },
  { id: 'Jeans', label: 'Jeans', icon: 'resize-outline' },
];

export const INITIAL_CART = [
  { productId: '2', quantity: 4, size: 'M', color: '#E8E8E8' },
  { productId: '1', quantity: 1, size: 'L', color: '#D4D4D4' },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
