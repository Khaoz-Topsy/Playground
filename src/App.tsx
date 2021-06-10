import React, { useEffect, useState } from 'react';
import { DarkMode, Drawer, useDisclosure } from '@chakra-ui/react';

import { Desktop } from './components/common/desktop/desktop';
import { Taskbar } from './components/common/taskbar/taskbar';
import { WindowManager } from './components/window/windowManager';
import { NotificationDrawer } from './components/notificationDrawer';
import { InitialisationScreen } from './components/common/initialisationScreen';
import { appPreloadAssets } from './helper/cacheHelper';

export const App: React.FC = () => {
  const { isOpen, /*onOpen, */ onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);

  useEffect(() => {
    appPreloadAssets()
      .then((_) => {
        setShouldFade(true);
        setTimeout(() => setIsLoaded(true), 1000);
      });
  }, []);

  return (
    <DarkMode>
      <div className="fullscreen">
        <Desktop />
        <WindowManager />
        <Taskbar />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <NotificationDrawer onClose={onClose} />
        </Drawer>
        {
          (isLoaded === false) && <InitialisationScreen shouldFade={shouldFade} />
        }
      </div>
    </DarkMode>
  );
}

