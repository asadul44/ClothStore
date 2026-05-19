import { PRODUCTS } from '@/constants/products';
import type { CollectionItem, PromoSlide } from '@/types/home';

export const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'slide-1',
    title: 'New Season',
    subtitle: 'Minimal looks for everyday wear',
    cta: 'Shop Now',
    image: PRODUCTS[0].image,
    productId: '1',
    accent: '#1C1C1E',
  },
  {
    id: 'slide-2',
    title: 'Dress Collection',
    subtitle: 'Elegant styles up to 30% off',
    cta: 'Explore',
    image: PRODUCTS[1].image,
    productId: '2',
    accent: '#2D2D2D',
  },
  {
    id: 'slide-3',
    title: 'Urban Denim',
    subtitle: 'Street-ready fits & clean cuts',
    cta: 'View Deals',
    image: PRODUCTS[2].image,
    productId: '3',
    accent: '#1A3A5C',
  },
  {
    id: 'slide-4',
    title: 'Evening Edit',
    subtitle: 'Premium dresses for special nights',
    cta: 'Discover',
    image: PRODUCTS[3].image,
    productId: '4',
    accent: '#3D3D3D',
  },
  {
    id: 'slide-5',
    title: 'Flash Sale',
    subtitle: 'Limited time — best sellers inside',
    cta: 'Grab Yours',
    image: PRODUCTS[0].image,
    productId: '1',
    accent: '#111111',
  },
];

export const RECOMMENDED_PRODUCT_IDS = ['1', '2', '4', '3', '1', '2'];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-summer',
    title: 'Summer Collection',
    subtitle: 'Light & breathable picks',
    itemCount: 24,
    image: PRODUCTS[1].image,
    productIds: ['2', '4'],
  },
  {
    id: 'col-modern',
    title: 'Modern Essentials',
    subtitle: 'Clean wardrobe staples',
    itemCount: 18,
    image: PRODUCTS[0].image,
    productIds: ['1', '3'],
  },
  {
    id: 'col-evening',
    title: 'Evening Edit',
    subtitle: 'Dress to impress',
    itemCount: 12,
    image: PRODUCTS[3].image,
    productIds: ['4', '2'],
  },
  {
    id: 'col-street',
    title: 'Street Style',
    subtitle: 'Casual urban looks',
    itemCount: 15,
    image: PRODUCTS[2].image,
    productIds: ['3', '1'],
  },
];

export function getRecommendedProducts() {
  return RECOMMENDED_PRODUCT_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
    (p): p is (typeof PRODUCTS)[number] => Boolean(p),
  );
}
