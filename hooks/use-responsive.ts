import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const columns = isTablet ? 3 : 2;
  const horizontalPadding = isTablet ? 32 : 20;
  const maxContentWidth = isTablet ? 720 : width;

  return { width, isTablet, columns, horizontalPadding, maxContentWidth };
}
