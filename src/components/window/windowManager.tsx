import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

// Applets
import { SettingApplet } from '../applet/settings/settingApplet';
import { NyanCatApplet } from '../applet/nyanCat/nyanCatApplet';

import { AppletType } from '../../constants/enum/appletType';
import { LaunchedApp } from '../../contracts/launchedApp';
import { sortByOpenOrder } from '../../helper/launchedAppHelper';
import { WindowStore } from '../../state/window/store';
import { IApplet } from '../../contracts/interface/IApplet';
import { closeApp, minimiseApp, setNewFocusForApp } from '../../state/window/reducer';

interface IProps { }

interface IModalProps {
    isOpen: boolean;
    applet: AppletType;
}

export const WindowManager: React.FC<IProps> = (props: IProps) => {
    const activeApps: Array<LaunchedApp> = WindowStore.useState(store => store.activeApps);
    const currentFocused: AppletType = WindowStore.useState(store => store.currentFocused);
    const [modalData, setModalData] = useState<IModalProps>({
        isOpen: false,
        applet: AppletType.none,
    });

    const onMaximise = (appType: AppletType) => () => { };

    const onSetFocus = (appType: AppletType) => () => WindowStore.update(setNewFocusForApp(appType));
    const onMinimise = (appType: AppletType) => () => WindowStore.update(minimiseApp(appType));
    const onClose = (appType: AppletType) => () => WindowStore.update(closeApp(appType));

    const onCloseModal = () => WindowStore.update(closeApp(modalData.applet),
        () => setModalData({
            isOpen: false,
            applet: AppletType.none,
        })
    );

    const mapWindow = (currentlyFocused: AppletType) => (app: LaunchedApp, index: number) => {
        const isFocused = app.appType === currentlyFocused;
        return {
            ...app,
            openOrder: app.openOrder + (isFocused ? 100 : 0),
        }
    }

    const renderSupportedWindows = (currentlyFocused: AppletType) => (app: LaunchedApp, index: number) => {
        const appProps: IApplet = {
            isFocused: app.appType === currentlyFocused,
            zIndex: app.openOrder,
            ...app.meta,
            onSetFocus: onSetFocus(app.appType),
            onMinimise: onMinimise(app.appType),
            onMaximise: onMaximise(app.appType),
            onClose: onClose(app.appType),
        };

        switch (app.appType) {
            case AppletType.setting: return <SettingApplet key={`AppletType-${app.appType}`} {...appProps} />
            case AppletType.nyanCat: return <NyanCatApplet key={`AppletType-${app.appType}`} {...appProps} />
        }

        if (!modalData.isOpen) {
            setModalData({
                isOpen: true,
                applet: app.appType,
            });
        }
        return <span key={`notFound-${index}`}></span>
    }

    return (
        <div className="window-manager layer fullscreen">
            <AnimatePresence>
                {
                    activeApps
                        .map(mapWindow(currentFocused))
                        .sort(sortByOpenOrder)
                        .map(renderSupportedWindows(currentFocused))
                }
            </AnimatePresence>
            <Modal isOpen={modalData.isOpen} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>App failed to launch</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Could not launch the requested app. This is most likely not you fault and is due to creator of this website missing something.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onCloseModal}>Close</Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

