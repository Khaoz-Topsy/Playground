import React from 'react';
import { Image, Center } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import { AppletIcon } from '../../../constants/appImage';
import { LaunchedApp } from '../../../contracts/launchedApp';
import { AppletType } from '../../../constants/enum/appletType';
import { currentShortTime, currentShortDate } from '../../../helper/dateHelper';

import { WindowStore } from '../../../state/window/store';
import { openAppFromTaskbar } from '../../../state/window/reducer';
import { TaskbarIcon } from './taskbarIcon';

export const Taskbar: React.FC = () => {
    const windStore = WindowStore.useState(store => store);

    const openApp = (appletType: AppletType) => (e: any) => {
        WindowStore.update(openAppFromTaskbar(appletType));
    }

    return (
        <div className="taskbar">
            <AnimatePresence>
                <div className="applet-shortcut noselect">
                    <Image src={AppletIcon.windows} alt={AppletIcon.windows} />
                </div>
                {
                    windStore.activeApps.map((applet: LaunchedApp, index: number) => {
                        return (
                            <TaskbarIcon
                                key={applet.appletType}
                                index={index}
                                applet={applet}
                                selected={applet.appletType === windStore.currentFocused}
                                openApp={openApp}
                            />
                        );
                    })
                }
            </AnimatePresence>
            <div className="taskbar-tray noselect">
                <Center>
                    <p>{currentShortTime()}<br />{currentShortDate()}</p>
                </Center>
            </div>
        </div>
    );
}

