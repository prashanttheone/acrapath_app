import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Main } from './src/main';
import { ThemeProvider } from './src/app/provider/ThemeProvider';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;

