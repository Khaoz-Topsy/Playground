import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { Image, Center } from '@chakra-ui/react';
import { BellIcon } from '@heroicons/react/solid';
import { AnimatePresence } from 'framer-motion';

import { AppletIcon } from '../../../constants/appImage';
import { TaskbarList } from '../../../constants/taskbarList';
import { LaunchedApp, NotLaunchedApp } from '../../../contracts/launchedApp';
import { currentShortTime, currentShortDate } from '../../../helper/dateHelper';
import { anyObject } from '../../../helper/typescriptHacks';

import { WindowStore } from '../../../state/window/store';
import { openAppFromTaskbar } from '../../../state/window/reducer';

import { TaskbarIcon } from './taskbarIcon';

interface IProps {
    drawerOnOpen: () => void;
}

export const Taskbar: React.FC<IProps> = (props: IProps) => {
    const windStore = WindowStore.useState(store => store);

    const openApp = (app: LaunchedApp | NotLaunchedApp) => (e: any) => {
        WindowStore.update(openAppFromTaskbar({
            ...app,
            meta: { ...app.meta, notOpen: undefined },
        }));
    }

    const appsToDisplay: Array<LaunchedApp | NotLaunchedApp> = [];
    for (const taskbar of TaskbarList) {
        const currentActiveApp = windStore.activeApps.find(aa => aa.appletType === taskbar.appletType);
        if (currentActiveApp != null) {
            appsToDisplay.push(currentActiveApp);
            continue;
        }

        appsToDisplay.push({
            ...taskbar,
            openOrder: 1,
            meta: {
                ...(taskbar.meta ?? anyObject),
            },
            isActive: false,
        });
    }

    const activeAppsNotInTaskbar = windStore.activeApps.filter(aa => appsToDisplay.findIndex(atd => atd.appletType === aa.appletType) < 0);
    for (const activeApp of activeAppsNotInTaskbar) {
        appsToDisplay.push(activeApp);
    }

    return (
        <div className="taskbar">
            <AnimatePresence>
                <div className="start-menu taskbar-highlight-on-hover applet-shortcut noselect">
                    <Image src={AppletIcon.windows} alt={AppletIcon.windows} />
                </div>
                {
                    appsToDisplay.map((applet: LaunchedApp | NotLaunchedApp, index: number) => {
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
            <div className="taskbar-tray taskbar-highlight-on-hover noselect">
                <Center>
                    <p>{currentShortTime()}<br />{currentShortDate()}</p>
                </Center>
            </div>
            <div className="taskbar-notification taskbar-highlight-on-hover noselect" onClick={props.drawerOnOpen}>
                <Center>
                    <Icon as={BellIcon} />
                </Center>
            </div>
        </div>
    );
}

