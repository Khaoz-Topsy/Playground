import React, { useEffect, useState } from 'react';
import { PullstateProvider } from "pullstate";

import { InitialisationScreen } from './components/common/initialisationScreen';
import { ToasterContainer } from './components/core/toast';
import { appPreloadAssets } from './helper/cacheHelper';
import { PullstateCore } from './state/stateCore';
import { subscribeToSecretChanges, subscribeToSettingsChanges } from './state/stateFromLocalStorage';

import { App } from './app';

interface IProps { }

export const AppShell: React.FC<IProps> = (props: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);
  const instance = PullstateCore.instantiate({ ssr: false });

  useEffect(() => {
    if (!isLoaded) {
      appPreloadAssets()
        .then((_) => {
          setShouldFade(true);
          setTimeout(() => setIsLoaded(true), 1000);
        });
    }

    const unsubscribeFromSettings = subscribeToSettingsChanges(instance.stores);
    const unsubscribeFromSecrets = subscribeToSecretChanges(instance.stores);

    return () => {
      unsubscribeFromSettings();
      unsubscribeFromSecrets();
    }
    // eslint-disable-next-line
  });

  return (
    <PullstateProvider instance={instance}>
      {(shouldFade) && <App />}
      <ToasterContainer />
      {(!isLoaded) && <InitialisationScreen shouldFade={shouldFade} />}
    </PullstateProvider>
  );
}
