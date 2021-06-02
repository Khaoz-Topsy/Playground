import React from 'react';
import { DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

interface IProps {
    onClose(): void
}

export const NotificationDrawer: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Notifications</DrawerHeader>

                <DrawerBody>
                    <ul>
                        <li>one</li>
                        <li>two</li>
                        <li>three</li>
                    </ul>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </>
    );
}

