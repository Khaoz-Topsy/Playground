import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

interface IProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<IProps> = (props: IProps) => {

  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: { 500: '#46a1ec' },
    },
  } as any);

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
}

