import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './theme/useTheme';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';

export const Main = () => {
  const { isDark } = useTheme();
  const [showLogin, setShowLogin] = useState(true);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {showLogin ? (
        <Login onToggleSignup={() => setShowLogin(false)} />
      ) : (
        <Signup onToggleLogin={() => setShowLogin(true)} />
      )}
    </SafeAreaProvider>
  );
};
