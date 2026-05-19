import { StaggeredProductGrid } from '@/components/clothing/home/StaggeredProductGrid';
import { useStore } from '@/context/StoreContext';

export function FavoritesGrid() {
  const { favoriteProducts } = useStore();

  return (
    <StaggeredProductGrid
      products={favoriteProducts}
      emptyMessage="Tap the heart on any product to save it here."
    />
  );
}
