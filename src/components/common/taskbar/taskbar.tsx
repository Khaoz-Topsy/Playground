import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { Image, Center } from '@chakra-ui/react';
import { BellIcon } from '@heroicons/react/solid';
import { AnimatePresence } from 'framer-motion';

import { secretFoundToast } from '../../core/toast';
import { AppletIcon } from '../../../constants/appImage';
import { TaskbarList } from '../../../constants/taskbarList';
import { FoundSecretType } from '../../../constants/enum/foundSecretType';
import { LaunchedApp, NotLaunchedApp } from '../../../contracts/launchedApp';
import { currentShortTime, currentShortDate } from '../../../helper/dateHelper';
import { TriggerAfterXClicks } from '../../../helper/clickHelper';
import { anyObject } from '../../../helper/typescriptHacks';
import { withServices } from '../../../integration/dependencyInjection';

import { openAppFromTaskbar } from '../../../state/window/reducer';
import { ISecretStore } from '../../../state/secrets/store';
import { PullstateCore } from '../../../state/stateCore';

import { TaskbarIcon } from './taskbarIcon';
import { dependencyInjectionToProps, IExpectedServices } from './taskbar.dependencyInjection';

interface IWithoutExpectedServices {
    toggleStartMenu: (newValue?: boolean) => void;
    drawerOnOpen: () => void;
};
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const TaskbarUnconnected: React.FC<IProps> = (props: IProps) => {
    const { WindowStore, SecretStore } = PullstateCore.useStores();
    const windStore = WindowStore.useState(store => store);
    const secretsFound = SecretStore.useState(store => store.secretsFound);

    const openApp = (app: LaunchedApp | NotLaunchedApp) => (e: any) => {
        props.toggleStartMenu(false);
        delete app.meta.notOpen;
        WindowStore.update(openAppFromTaskbar({
            ...app,
            meta: { ...app.meta },
        }));
    }

    const notificationBellClick = () => {
        props.drawerOnOpen();
        props.toggleStartMenu(false);
    }

    const doHarlemShake = () => {
        if (!secretsFound.includes(FoundSecretType.harlemShake)) {
            secretFoundToast(FoundSecretType.harlemShake);
            SecretStore.update((store: ISecretStore) => {
                store.secretsFound = [...store.secretsFound, FoundSecretType.harlemShake];
            })
            props.sillyService.doHarlemShake();
        }
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
                <TriggerAfterXClicks classNames="start-menu taskbar-highlight-on-hover applet-shortcut noselect"
                    onClick={() => props.toggleStartMenu()}
                    numberOfRequiredClicks={5}
                    trigger={doHarlemShake}
                >
                    <Image src={AppletIcon.windows} alt={AppletIcon.windows} />
                </TriggerAfterXClicks>
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
            <TriggerAfterXClicks classNames="taskbar-notification taskbar-highlight-on-hover noselect"
                onClick={notificationBellClick}
                numberOfRequiredClicks={5}
                trigger={doHarlemShake}
            >
                <Center>
                    <Icon as={BellIcon} />
                </Center>
            </TriggerAfterXClicks>
        </div>
    );
}

export const Taskbar = withServices<IWithoutExpectedServices, IExpectedServices>(
    TaskbarUnconnected,
    dependencyInjectionToProps
);

