import { StyleSheet, View } from "react-native";

import { AppNavigation } from "@/app/_layout";
import {
    CategoryList,
    CollectionSection,
    DiscoverSection,
    HeroCarousel,
    HomeHeader,
    RecommendedSection,
    ScreenContainer,
    SearchBar,
} from "@/components/clothing";

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <ScreenContainer bottomInset={120}>
        <HomeHeader />
        <SearchBar />
        <HeroCarousel />
        <CategoryList />
        <DiscoverSection />
        <RecommendedSection />
        <CollectionSection />
      </ScreenContainer>
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
