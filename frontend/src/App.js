import {
  ChakraProvider, theme
} from '@chakra-ui/react';
import React from 'react';
import { Champions } from './champions';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Champions></Champions>
    </ChakraProvider>
  );
}

export default App;
