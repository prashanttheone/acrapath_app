import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';

export const useTheme = () => {
  const isDark = useColorScheme() === 'dark';
  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
  };
};
