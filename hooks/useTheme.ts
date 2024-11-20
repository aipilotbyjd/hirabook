import { useColorScheme } from 'react-native';
import { theme } from '../constants/theme';

export function useTheme() {
  const colorScheme = useColorScheme();
  
  // You can add dark mode colors here
  const colors = colorScheme === 'dark' 
    ? {
        ...theme.colors,
        background: '#000000',
        text: '#FFFFFF',
        card: '#121212',
      }
    : theme.colors;

  return {
    ...theme,
    colors,
    colorScheme,
  };
} 