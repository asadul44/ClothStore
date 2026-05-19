import { StyleSheet, View } from 'react-native';

import { AppNavigation } from '@/app/_layout';
import {
  CategoryList,
  ProductGrid,
  ScreenContainer,
  SearchBar,
  SearchScreenHeader,
} from '@/components/clothing';

export default function SearchScreen() {
  return (
    <View style={styles.root}>
      <ScreenContainer>
        <SearchScreenHeader />
        <SearchBar autoFocus />
        <CategoryList />
        <ProductGrid />
      </ScreenContainer>
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
