import React, { useEffect, useState } from 'react';
import { Drawer, useDisclosure } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';

import { SpotlightSearch } from './components/common/spotlight';
import { NotificationDrawer } from './components/common/drawer/notificationDrawer';
import { Desktop } from './components/common/desktop/desktop';
import { Taskbar } from './components/common/taskbar/taskbar';
import { WindowManager } from './components/window/windowManager';
import { StartMenu } from './components/common/startmenu/startMenu';
import { InitialisationScreen } from './components/common/initialisationScreen';
import { ToasterContainer } from './components/core/toast';
import { appPreloadAssets } from './helper/cacheHelper';
import { SettingStore } from './state/setting/store';
import { CustomThemeProvider } from './themeProvider';

interface IProps { }

export const App: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const [isSpotlightOpen, setSpotlightOpen] = useState(false);

  const currentSettings = SettingStore.useState(store => store);
  const brightnessPerc = (currentSettings.brightness / 2) + 50;

  useEffect(() => {
    if (!isLoaded) {
      appPreloadAssets()
        .then((_) => {
          setShouldFade(true);
          setTimeout(() => setIsLoaded(true), 1000);
        });
    }
    Mousetrap.bind('ctrl+space', () => setSpotlightOpen(!isSpotlightOpen));

    return () => {
      Mousetrap.unbind('ctrl+space');
    }
    // eslint-disable-next-line
  }, [isSpotlightOpen]);

  const toggleStartMenu = (newValue?: boolean) => {
    setStartMenuOpen(newValue ?? (!isStartMenuOpen));
  };

  return (
    <CustomThemeProvider>
      <div className="fullscreen layer" style={{ filter: `brightness(${brightnessPerc}%)` }}>
        <Desktop />
        <WindowManager />
        <Taskbar
          drawerOnOpen={onOpen}
          toggleStartMenu={toggleStartMenu}
        />
        <StartMenu
          isOpen={isStartMenuOpen}
          toggleStartMenu={toggleStartMenu}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <NotificationDrawer
            onClose={onClose}
          />
        </Drawer>
        <SpotlightSearch
          isOpen={isSpotlightOpen}
          onClose={() => setSpotlightOpen(false)}
        />
        {
          (isLoaded === false) && <InitialisationScreen shouldFade={shouldFade} />
        }
      </div>
      <ToasterContainer />
    </CustomThemeProvider>
  );
}

