import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from './theme/useTheme';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Home } from './screens/Home';
import { PostJob } from './screens/PostJob';
import { CandidateTabNavigator } from './navigation/CandidateTabNavigator';
import { SearchScreen } from './screens/SearchScreen';
import { JobDetailsScreen } from './screens/JobDetailsScreen';
import { useAuth } from './app/provider/AuthProvider';
import { PostHogProvider } from 'posthog-react-native';

const Stack = createNativeStackNavigator();

export const Main = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading, user, activeRole } = useAuth();

  if (isLoading) {
    return null; // Could be a splash screen
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <PostHogProvider 
          apiKey="phc_t8sYLHCCUPij9ouFk6zk576GMqHjowudUig2Sj6Cnmiy" 
          autocapture={{ captureScreens: false }}
          options={{ 
            host: "https://eu.i.posthog.com",
            enableSessionReplay: true,
            sessionReplayConfig: {
              maskAllTextInputs: false,
              maskAllImages: false,
            }
          }}
        >
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false, 
              animation: 'slide_from_right' 
            }}
          >
            {isAuthenticated ? (
              activeRole === 'recruiter' ? (
                <>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="PostJob" component={PostJob} />
                </>
              ) : (
                <>
                  <Stack.Screen name="CandidateTabs" component={CandidateTabNavigator} />
                  <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
                  <Stack.Screen name="SearchScreen" component={SearchScreen} />
                </>
              )
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </PostHogProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
