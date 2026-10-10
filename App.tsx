import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/stores';
import { Main } from './src/main';
import { ThemeProvider } from './src/app/provider/ThemeProvider';
import { AuthProvider } from './src/app/provider/AuthProvider';

import { PostHogProvider } from 'posthog-react-native';

const queryClient = new QueryClient();

function App() {
  return (
    <PostHogProvider 
      apiKey="phc_t8sYLHCCUPij9ouFk6zk576GMqHjowudUig2Sj6Cnmiy" 
      options={{ host: "https://eu.i.posthog.com" }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider>
                <Main />
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </GestureHandlerRootView>
    </PostHogProvider>
  );
}

export default App;

