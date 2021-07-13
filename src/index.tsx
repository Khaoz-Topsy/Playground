import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
// import reportWebVitals from './reportWebVitals';

import { AppShell } from './appShell';
import { log, startupMessage } from './integration/logging';
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import { getJSON, defaultConfig } from './utils';
import { CustomThemeProvider } from './themeProvider';

import './scss/custom.scss';
import 'react-image-lightbox/style.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window { config: any; registration: any }
}

// let persistedState: any = loadStateFromLocalStorage();
// persistedState.settingReducer.menuIsVisible = false;

// const store = createStore(
//   reducer,
//   persistedState,
// );

// store.subscribe(() => saveStateToLocalStorage(store));

window.config = window.config || {};
getJSON('/assets/config.json', (status: boolean, response: string) => {
  window.config = (status === true)
    ? response || {}
    : defaultConfig;

  startupMessage();
  log(window.config);

  ReactDOM.render(
    <React.Fragment>
      <DependencyInjectionProvider>
        <ChakraProvider>
          <CustomThemeProvider>
            <AppShell />
          </CustomThemeProvider>
        </ChakraProvider>
      </DependencyInjectionProvider>
    </React.Fragment>,
    document.getElementById('kurt-lourens-desktop')
  );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
