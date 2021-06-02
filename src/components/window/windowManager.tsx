import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { AppletType } from '../../constants/enum/appletType';
import { LaunchedApp } from '../../contracts/launchedApp';
import { WindowStore } from '../../state/window';
import { SettingApplet } from '../applet/settings/settingApplet';

interface IProps { }

export const WindowManager: React.FC<IProps> = (props: IProps) => {
    const activeApps: Array<LaunchedApp> = WindowStore.useState(store => store.activeApps);
    const currentFocused: AppletType = WindowStore.useState(store => store.currentFocused);

    const onMaximise = (appType: AppletType) => () => { };

    const onMinimise = (appType: AppletType) => () => {
        WindowStore.update(store => {
            store.currentFocused = AppletType.none;
            store.activeApps = [...store.activeApps.map(aa => ({
                ...aa,
                additionalProps: {
                    ...aa.additionalProps,
                    isMinimised: (aa.appType === appType)
                        ? !aa.additionalProps.isMinimised
                        : aa.additionalProps.isMinimised,
                }
            }))];
        });
    };

    const onClose = (appType: AppletType) => () => {
        WindowStore.update(store => {
            store.currentFocused = AppletType.none;
            store.activeApps = [...store.activeApps.filter(aa => aa.appType !== appType)]
        });
    };

    const renderSupportedWindows = (currentlyFocused: AppletType) => (app: LaunchedApp, index: number) => {
        const appProps = {
            isFocused: AppletType.setting === currentlyFocused,
            ...app.additionalProps,
            onMinimise: onMinimise(currentlyFocused),
            onMaximise: onMaximise(currentlyFocused),
            onClose: onClose(currentlyFocused),
        };

        switch (app.appType) {
            case AppletType.setting:
                return <SettingApplet key={AppletType.setting} {...appProps} />
        }

        return <span key={`notFound-${index}`}></span>
    }

    return (
        <div className="window-manager layer fullscreen">
            <AnimatePresence>
                {
                    activeApps.map(renderSupportedWindows(currentFocused))
                }
            </AnimatePresence>
        </div>
    );
}

