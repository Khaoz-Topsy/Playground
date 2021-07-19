import React from 'react';
import { Center } from '@chakra-ui/react';

import { DiscordMiniLogo } from '../../core/icon';
import { ContextMenuWrapper, IContextMenuItemProps, OptionState } from '../../core/contextMenu';
import { BasicImage } from '../../core/image';
import { site } from '../../../constants/site';
import { FileIcon } from '../../../constants/appImage';
import { LocaleKey } from '../../../localization/LocaleKey';
import { openExternalInNewTab } from '../../../helper/linkHelper';

interface IProps {
    toggleStartMenu: (newValue?: boolean) => void;
};

export const TaskbarDiscordIcon: React.FC<IProps> = (props: IProps) => {
    const menuItems: Array<IContextMenuItemProps> = [
        {
            name: 'AssistantApps Discord' as any,
            onClick: () => openExternalInNewTab(site.assistantApps.discord),
            icon: () => <BasicImage
                imageUrl={FileIcon.miniLink}
                classNames="mini mr0-5"
                alt={`-mini`}
            />,
        },
        {
            name: 'AssistantApps Discord Divider' as any,
            optionState: OptionState.Divider,
        },
        {
            name: LocaleKey.exit,
            optionState: OptionState.Disabled,
        }
    ];

    return (
        <ContextMenuWrapper
            baseKey="TaskbarDiscord"
            className="taskbar-notification taskbar-highlight-on-hover noselect"
            items={menuItems}
        >
            <Center>
                <DiscordMiniLogo />
            </Center>
        </ContextMenuWrapper>
    );
}

