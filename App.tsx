import React from 'react';
import { Main } from './src/main';
import { ThemeProvider } from './src/app/provider/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;

