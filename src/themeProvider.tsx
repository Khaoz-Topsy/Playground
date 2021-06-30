import React, { ReactNode } from 'react';
import { DarkMode } from '@chakra-ui/react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

interface IProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<IProps> = (props: IProps) => {

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: { 500: '#46a1ec' },
    },
  } as any);

  return (
    <DarkMode>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </DarkMode>
  );
}

