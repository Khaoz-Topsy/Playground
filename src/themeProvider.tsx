import React, { ReactNode } from 'react';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import {
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

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
      <DarkMode>
        <ThemeProvider theme={theme}>
          {props.children}
        </ThemeProvider>
      </DarkMode>
    </ChakraProvider>
  );
}

