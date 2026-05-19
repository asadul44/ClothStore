import { StaggeredProductGrid } from '@/components/clothing/home/StaggeredProductGrid';
import { useStore } from '@/context/StoreContext';

export function ProductGrid() {
  const { filteredProducts } = useStore();

  return <StaggeredProductGrid products={filteredProducts} />;
}
