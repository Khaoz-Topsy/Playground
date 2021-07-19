import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { Image, Center, useToast } from '@chakra-ui/react';
import { BellIcon } from '@heroicons/react/solid';
import { AnimatePresence } from 'framer-motion';

import { AppletIcon } from '../../../constants/appImage';
import { TaskbarList } from '../../../constants/taskbarList';
import { FoundSecretType } from '../../../constants/enum/foundSecretType';
import { LaunchedApp, NotLaunchedApp } from '../../../contracts/launchedApp';
import { disabledContext, TriggerAfterXClicks } from '../../../helper/clickHelper';
import { newGuid } from '../../../helper/guidHelper';
import { anyObject } from '../../../helper/typescriptHacks';
import { addSecretIfNotFound } from '../../../helper/secretFoundHelper';
import { withServices } from '../../../integration/dependencyInjection';
import { closeApp, openAppFromTaskbar } from '../../../state/window/reducer';
import { WindowStore } from '../../../state/window/store';
import { SecretStore } from '../../../state/secrets/store';
import { TaskbarTime } from '../time/taskbarTime';

import { dependencyInjectionToProps, IExpectedServices } from './taskbar.dependencyInjection';
import { TaskbarBatteryIcon } from './taskbarBatteryIcon';
import { TaskbarDiscordIcon } from './taskbarDiscordIcon';
import { TaskbarIcon } from './taskbarIcon';
import classNames from 'classnames';

interface IWithoutExpectedServices {
    isStartMenuOpen: boolean;
    toggleStartMenu: (newValue?: boolean) => void;
    drawerOnOpen: () => void;
};
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const TaskbarUnconnected: React.FC<IProps> = (props: IProps) => {
    const windStore = WindowStore.useState(store => store);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    const openApp = (app: LaunchedApp | NotLaunchedApp) => (e: any) => {
        props.toggleStartMenu(false);
        delete app.meta.notOpen;
        WindowStore.update(openAppFromTaskbar({
            ...app,
            meta: { ...app.meta },
        }));
    }

    const closeRunningApp = (app: LaunchedApp | NotLaunchedApp) => (e: any) => {
        props.toggleStartMenu(false);
        delete app.meta.notOpen;
        WindowStore.update(closeApp(app.guid));
    }

    const notificationBellClick = () => {
        props.drawerOnOpen();
        props.toggleStartMenu(false);
    }

    const doHarlemShake = () => addSecretIfNotFound({
        secretStore: SecretStore,
        currentSecretsFound,
        toastFunc,
        secretToAdd: FoundSecretType.harlemShake,
        callbackFinally: () => props.sillyService.doHarlemShake?.(),
    });

    const appsToDisplay: Array<LaunchedApp | NotLaunchedApp> = [];
    for (const taskbar of TaskbarList) {
        const currentActiveApp = windStore.activeApps.find(aa => aa.appletType === taskbar.appletType);
        if (currentActiveApp != null) {
            appsToDisplay.push(currentActiveApp);
            continue;
        }

        appsToDisplay.push({
            ...taskbar,
            guid: newGuid(),
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
        <div className="taskbar" onContextMenu={disabledContext}>
            <AnimatePresence>
                <TriggerAfterXClicks classNames="start-menu taskbar-highlight-on-hover applet-shortcut noselect"
                    onClick={() => props.toggleStartMenu()}
                    numberOfRequiredClicks={5}
                    trigger={doHarlemShake}
                >
                    {/* <div className={classNames('hamburgler', { 'no-hamburgler': props.isStartMenuOpen })}>
                        <div className="bun top"></div>
                        <div className="meat"></div>
                        <div className="bun bottom"></div>
                    </div> */}
                    <Image src={AppletIcon.windows} alt={AppletIcon.windows} />
                </TriggerAfterXClicks>
                {
                    appsToDisplay.map((applet: LaunchedApp | NotLaunchedApp, index: number) => {
                        return (
                            <TaskbarIcon
                                key={applet.appletType}
                                index={index}
                                applet={applet}
                                selected={applet.guid === windStore.currentFocused}
                                openApp={openApp}
                                closeApp={closeRunningApp}
                            />
                        );
                    })
                }
            </AnimatePresence>
            <TaskbarTime toggleStartMenu={props.toggleStartMenu} />
            <TriggerAfterXClicks classNames="taskbar-notification taskbar-highlight-on-hover noselect"
                onClick={notificationBellClick}
                numberOfRequiredClicks={5}
                trigger={doHarlemShake}
            >
                <Center>
                    <Icon as={BellIcon} />
                </Center>
            </TriggerAfterXClicks>
            <TaskbarBatteryIcon toggleStartMenu={props.toggleStartMenu} sillyService={props.sillyService} />
            <TaskbarDiscordIcon toggleStartMenu={props.toggleStartMenu} />
        </div>
    );
}

export const Taskbar = withServices<IWithoutExpectedServices, IExpectedServices>(
    TaskbarUnconnected,
    dependencyInjectionToProps
);

