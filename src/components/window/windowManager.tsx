import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { IApplet } from '../../contracts/interface/IApplet';
import { AppletType } from '../../constants/enum/appletType';
import { defaultWindowCoordShift, defaultWindowXPosition, defaultWindowYPosition } from '../../constants/window';
import { LaunchedApp } from '../../contracts/launchedApp';
import { windowActionEvent } from '../../constants/enum/customWindowEvent';
import { closeApp, maximiseApp, minimiseApp, setNewFocusForApp } from '../../state/window/reducer';
import { WindowStore } from '../../state/window/store';

import { windowDisplayer } from './windowDisplayer';

interface IProps { }

interface IModalProps {
    guid: string;
    isOpen: boolean;
    applet: AppletType;
}

const initialModalState: IModalProps = {
    guid: '',
    isOpen: false,
    applet: AppletType.none,
}

export const WindowManager: React.FC<IProps> = (props: IProps) => {
    const activeApps: Array<LaunchedApp> = WindowStore.useState(store => store.activeApps);
    const currentFocused: string = WindowStore.useState(store => store.currentFocused);
    const [modalData, setModalData] = useState<IModalProps>(initialModalState);

    const onMaximise = (guid: string) => (e: any) => WindowStore.update(maximiseApp(guid));

    const onSetFocus = (guid: string) => (e: any) => {
        if (e?.customEvent === windowActionEvent) return;
        WindowStore.update(setNewFocusForApp(guid))
    };
    const onMinimise = (guid: string) => (e: any) => WindowStore.update(minimiseApp(guid));
    const onClose = (guid: string) => (e: any) => WindowStore.update(closeApp(guid));

    const onCloseModal = () => WindowStore.update(closeApp(modalData.guid),
        () => setModalData(initialModalState)
    );

    const renderSupportedWindows = (currentlyFocused: string) => (app: LaunchedApp, index: number) => {
        const coordShift = defaultWindowCoordShift * (index % 10);
        const appProps: IApplet = {
            ...app,
            isFocused: app.guid === currentlyFocused,
            zIndex: app.openOrder,
            ...app.meta,
            defaultX: defaultWindowXPosition + coordShift,
            defaultY: defaultWindowYPosition + coordShift,
            onSetFocus: onSetFocus(app.guid),
            onMinimise: onMinimise(app.guid),
            onMaximise: onMaximise(app.guid),
            onClose: onClose(app.guid),
        };

        const applet = windowDisplayer(appProps);
        if (applet != null) return applet;

        if (!modalData.isOpen) {
            setModalData({
                guid: appProps.guid,
                isOpen: true,
                applet: app.appletType,
            });
        }
        return <span key={`notFound-${index}`}></span>
    }

    return (
        <div className="window-manager layer fullscreen" draggable="false">
            <AnimatePresence>
                {
                    (activeApps ?? [])
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
                        <Button colorScheme="blue" onClick={onCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

