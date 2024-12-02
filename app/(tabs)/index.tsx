import { Stack } from 'expo-router';
import { View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
      </View>
    </>
  );
}
