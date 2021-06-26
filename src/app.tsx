import React, { useEffect, useState } from 'react';
import { DarkMode, Drawer, useDisclosure } from '@chakra-ui/react';

import { Desktop } from './components/common/desktop/desktop';
import { Taskbar } from './components/common/taskbar/taskbar';
import { WindowManager } from './components/window/windowManager';
import { NotificationDrawer } from './components/common/drawer/notificationDrawer';
import { InitialisationScreen } from './components/common/initialisationScreen';
import { appPreloadAssets } from './helper/cacheHelper';
import { StartMenu } from './components/common/startmenu/startMenu';

interface IProps { }

export const App: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);

  useEffect(() => {
    appPreloadAssets()
      .then((_) => {
        setShouldFade(true);
        setTimeout(() => setIsLoaded(true), 1000);
        setTimeout(onOpen, 2000);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <DarkMode>
      <div className="fullscreen">
        <Desktop />
        <WindowManager />
        <Taskbar drawerOnOpen={onOpen} />
        {/* <StartMenu /> */}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <NotificationDrawer
            onClose={onClose}
          />
        </Drawer>
        {
          (isLoaded === false) && <InitialisationScreen shouldFade={shouldFade} />
        }
      </div>
    </DarkMode>
  );
}

