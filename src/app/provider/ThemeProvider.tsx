import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

type ThemeContextType = {
  isDark: boolean;
  colors: typeof lightColors;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeSetting, setThemeSetting] = useState<'light' | 'dark' | 'system'>('system');

  const isDark = themeSetting === 'system' 
    ? systemColorScheme === 'dark' 
    : themeSetting === 'dark';

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, setTheme: setThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};
