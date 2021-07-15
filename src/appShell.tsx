import React, { useEffect, useState } from 'react';
import { PullstateProvider } from "pullstate";

import { InitialisationScreen } from './components/common/initialisationScreen';
import { ToasterContainer } from './components/core/toast';
import { appPreloadAssets } from './helper/cacheHelper';
import { PullstateCore } from './state/stateCore';
import { subscribeToSecretChanges, subscribeToSettingsChanges } from './state/stateFromLocalStorage';

import { App } from './app';
import { Button, Center } from '@chakra-ui/react';
import { translate } from './integration/i18n';
import { LocaleKey } from './localization/LocaleKey';

interface IProps { }

export const AppShell: React.FC<IProps> = (props: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);
  const [mobileConfirmed, setMobileConfirmed] = useState(false);
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
      {
        (!mobileConfirmed) && (
          <Center className="fullscreen layer initial show-in-mobile">
            <h1>{translate(LocaleKey.mobileNotice)}</h1>
            <h3>{translate(LocaleKey.mobileNoticeDescrip)}</h3>
            <Button mt={3} colorScheme="twitter" onClick={() => setMobileConfirmed(true)}>
              {translate(LocaleKey.mobileNoticeAccept)}
            </Button>
          </Center>
        )
      }
      {(!isLoaded) && <InitialisationScreen shouldFade={shouldFade} />}
    </PullstateProvider>
  );
}
