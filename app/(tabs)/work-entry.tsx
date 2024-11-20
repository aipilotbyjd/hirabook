import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ScreenContent } from '~/components/ScreenContent';
import { theme } from '~/constants/theme';

export default function WorkEntry() {
  return (
    <>
      <Stack.Screen options={{ title: 'Daily Work Entry' }} />
      <View style={{ flex: 1, padding: theme.spacing.md }}>
        <ScreenContent path="app/(tabs)/work-entry.tsx" title="Work Entry" />
      </View>
    </>
  );
} 