import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

import { ClothingColors, type ThemeMode } from '@/constants/clothing-theme';
import { INITIAL_CART, PRODUCTS } from '@/constants/products';
import type { CartItem, Product, ProductCategory } from '@/types/product';

type StoreContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
  products: Product[];
  cart: CartItem[];
  favorites: string[];
  selectedCategory: ProductCategory;
  searchQuery: string;
  setSelectedCategory: (category: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addToCart: (item: CartItem) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  filteredProducts: Product[];
  favoriteProducts: Product[];
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [themeOverride, setThemeOverride] = useState<ThemeMode | null>(null);
  const theme: ThemeMode = themeOverride ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [favorites, setFavorites] = useState<string[]>(['1', '4']);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Items');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = useCallback(() => {
    setThemeOverride((prev) => {
      const current = prev ?? (systemScheme === 'dark' ? 'dark' : 'light');
      return current === 'light' ? 'dark' : 'light';
    });
  }, [systemScheme]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  );

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) =>
          c.productId === item.productId && c.size === item.size && c.color === item.color,
      );
      if (existing) {
        return prev.map((c) =>
          c.productId === item.productId && c.size === item.size && c.color === item.color
            ? { ...c, quantity: c.quantity + item.quantity }
            : c,
        );
      }
      return [...prev, item];
    });
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.productId === productId ? { ...c, quantity: Math.max(1, quantity) } : c))
        .filter((c) => c.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  }, []);

  const getCartCount = useCallback(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Items' || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const favoriteProducts = useMemo(
    () => PRODUCTS.filter((p) => favorites.includes(p.id)),
    [favorites],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      theme,
      toggleTheme,
      products: PRODUCTS,
      cart,
      favorites,
      selectedCategory,
      searchQuery,
      setSelectedCategory,
      setSearchQuery,
      toggleFavorite,
      isFavorite,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      getCartCount,
      getCartTotal,
      filteredProducts,
      favoriteProducts,
    }),
    [
      theme,
      toggleTheme,
      cart,
      favorites,
      selectedCategory,
      searchQuery,
      toggleFavorite,
      isFavorite,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      getCartCount,
      getCartTotal,
      filteredProducts,
      favoriteProducts,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}

export function useClothingTheme() {
  const { theme } = useStore();
  return { theme, colors: ClothingColors[theme] };
}
