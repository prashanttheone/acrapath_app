import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from './theme/useTheme';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Home } from './screens/Home';
import { useAuth } from './app/provider/AuthProvider';

const Stack = createNativeStackNavigator();

export const Main = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Could be a splash screen
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false, 
            animation: 'slide_from_right' 
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
