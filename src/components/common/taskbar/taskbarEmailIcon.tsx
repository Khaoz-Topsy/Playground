import React from 'react';
import { Center } from '@chakra-ui/react';
import { MailIcon } from '@heroicons/react/solid';

import { ContextMenuWrapper, IContextMenuItemProps, OptionState } from '../../core/contextMenu';
import { KnownApplets } from '../../../constants/knownApplets';
import { LocaleKey } from '../../../localization/LocaleKey';
import { openAppletOrFile } from '../../../helper/appletHelper';
import { WindowStore } from '../../../state/window/store';
import { MiscStore } from '../../../state/misc/store';

interface IProps {
    toggleStartMenu: (newValue?: boolean) => void;
};

export const TaskbarEmailIcon: React.FC<IProps> = (props: IProps) => {
    const openEmailApp = () => {
        props.toggleStartMenu(false);
        openAppletOrFile(WindowStore, KnownApplets.email);
    }

    const menuItems: Array<IContextMenuItemProps> = [
        {
            name: LocaleKey.email,
            onClick: openEmailApp,
        },
        {
            name: LocaleKey.newEmail,
            onClick: () => MiscStore.update(store => ({ ...store, newEmailIsOpen: true })),
        },
        {
            name: 'Email Divider' as any,
            optionState: OptionState.Divider,
        },
        {
            name: LocaleKey.exit,
            optionState: OptionState.Disabled,
        },
    ];


    return (
        <ContextMenuWrapper
            baseKey="taskbarEmail"
            className="taskbar-notification taskbar-highlight-on-hover noselect"
            items={menuItems}
        >
            <Center onClick={openEmailApp}>
                <MailIcon />
            </Center>
        </ContextMenuWrapper>
    );
}

