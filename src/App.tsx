import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Drawer, useDisclosure } from '@chakra-ui/react';

import { Desktop } from './components/common/desktop';
import { Taskbar } from './components/common/taskbar';
import { NotificationDrawer } from './components/notificationDrawer';
import { SettingApplet } from './components/applet/settings/settingApplet';

export const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setTimeout(() => {
      // onOpen();
    }, 2000)
  }, []);

  return (
    <div className={classNames('fullscreen', 'bg1')}>
      <Desktop />
      <SettingApplet />
      <Taskbar />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <NotificationDrawer onClose={onClose} />
      </Drawer>
    </div>
  );
}

