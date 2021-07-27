import React, { useEffect, useState } from 'react';
import { Drawer, useDisclosure, useToast } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';

import { SpotlightSearch } from './components/common/spotlight/spotlight';
import { NotificationDrawer } from './components/common/drawer/notificationDrawer';
import { Desktop } from './components/common/desktop/desktop';
import { MiscLayer } from './components/common/misc/miscLayer';
import { StartMenu } from './components/common/startmenu/startMenu';
import { Taskbar } from './components/common/taskbar/taskbar';
import { WindowManager } from './components/window/windowManager';
import { FoundSecretType } from './constants/enum/foundSecretType';
import { knownKeybinds } from './constants/keybind';
import { addSecretIfNotFound } from './helper/secretFoundHelper';
import { IDependencyInjection, withServices } from './integration/dependencyInjection';
import { initLocalization } from './integration/i18n';
import { SillyService } from './services/SillyService';
import { VirtualAssistantService } from './services/VirtualAssistantService';
import { defaultSettingProps } from './state/setting/store';
import { defaultSecretProps } from './state/secrets/store';
import { loadStateFromLocalStorage } from './state/stateFromLocalStorage';
import { PullstateCore } from './state/stateCore';

interface IExpectedServices {
  sillyService: SillyService;
  virtualAssistantService: VirtualAssistantService;
}
interface IWithoutExpectedServices { };
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const AppUnconnected: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const [isSpotlightOpen, setSpotlightOpen] = useState(false);
  const toastFunc = useToast();

  const { SettingStore, SecretStore, WindowStore } = PullstateCore.useStores();
  const currentSettings = SettingStore.useState(store => store);
  const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
  const brightnessPerc = (currentSettings.brightness / 2) + 50;

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      const stateFromLocalStorage = loadStateFromLocalStorage();
      const settingStore = { ...defaultSettingProps, ...stateFromLocalStorage.SettingStore };
      const secretStore = { ...defaultSecretProps, ...stateFromLocalStorage.SecretStore };

      if (settingStore.enabledClippy) props.virtualAssistantService.show();

      SettingStore.update(store => ({ ...store, ...settingStore }));
      SecretStore.update(store => ({ ...store, ...secretStore }));
      initLocalization(settingStore.language);
    }

    Mousetrap.bind(knownKeybinds.spotlight, (e) => toggleSpotlight(e));
    Mousetrap.bind(knownKeybinds.spotlightAlt, (e) => toggleSpotlight(e));
    Mousetrap.bind(knownKeybinds.konami, () => konamiCodeFunc());
    Mousetrap.bind(knownKeybinds.minimiseAll, (e) => minimiseAllWindows(e));
    Mousetrap.bind(knownKeybinds.minimiseAllAlt, (e) => minimiseAllWindows(e));

    return () => {
      Mousetrap.unbind(knownKeybinds.spotlight);
      Mousetrap.unbind(knownKeybinds.spotlightAlt);
      Mousetrap.unbind(knownKeybinds.konami);
      Mousetrap.unbind(knownKeybinds.minimiseAll);
      Mousetrap.unbind(knownKeybinds.minimiseAllAlt);
    }
    // eslint-disable-next-line
  }, [isSpotlightOpen]);

  const toggleStartMenu = (newValue?: boolean) => {
    setStartMenuOpen(newValue ?? (!isStartMenuOpen));
  };

  const toggleSpotlight = (e?: any, newValue?: boolean) => {
    e?.preventDefault?.();
    const newIsSpotlightOpen = newValue ?? (!isSpotlightOpen);
    setSpotlightOpen(newIsSpotlightOpen);
  };

  const konamiCodeFunc = () => addSecretIfNotFound({
    secretStore: SecretStore,
    currentSecretsFound,
    toastFunc,
    secretToAdd: FoundSecretType.harlemShake,
    callbackFinally: () => props.sillyService.doHarlemShake?.(),
  });

  const minimiseAllWindows = (e: any) => {
    e?.preventDefault?.();
    WindowStore.update(store => ({
      activeApps: store.activeApps.map(a => ({ ...a, meta: { ...a.meta, isMinimised: true } })),
    }))
  };

  return (
    <div
      className="fullscreen layer"
      style={{ filter: `brightness(${brightnessPerc}%)` }}
    >
      <Desktop />
      <WindowManager />
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        drawerOnOpen={onOpen}
        toggleStartMenu={toggleStartMenu}
      />
      <StartMenu
        isOpen={isStartMenuOpen}
        toggleStartMenu={toggleStartMenu}
      />
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <NotificationDrawer
          onClose={onClose}
        />
      </Drawer>
      <MiscLayer />
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => toggleSpotlight(null, false)}
      />
    </div>
  );
}

export const App = withServices<IWithoutExpectedServices, IExpectedServices>(
  AppUnconnected,
  (services: IDependencyInjection): IExpectedServices => ({
    sillyService: services.sillyService,
    virtualAssistantService: services.virtualAssistantService,
  }),
);
