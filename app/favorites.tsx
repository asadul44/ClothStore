import { useRouter } from 'expo-router';

import {
  FavoritesGrid,
  FavoritesHeader,
  IconCircleButton,
  ScreenContainer,
} from '@/components/clothing';
import { StyleSheet, View } from 'react-native';

export default function FavoritesScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <IconCircleButton name="chevron-back" onPress={() => router.back()} variant="ghost" />
      </View>
      <FavoritesHeader />
      <FavoritesGrid />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: -8,
  },
});
