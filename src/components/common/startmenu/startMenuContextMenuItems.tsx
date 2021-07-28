import { TrashIcon } from '@heroicons/react/solid';

import { IContextMenuItemProps, OptionState } from '../../core/contextMenu';
import { IAppletFile, isLink, IStartMenuItemProps } from '../../../contracts/interface/IFile';
import { openExternalInNewWindow } from '../../../helper/linkHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface IContextWrapperItems {
    sMenu: IStartMenuItemProps;
    showUninstall?: boolean;
    openApp: (e: any) => void;
    openAppProperties?: () => void;
}
export const getContextWrapperItems = (props: IContextWrapperItems) => {
    const commonMenuItems: Array<IContextMenuItemProps> = [];
    const appletFile = (props.sMenu as any);
    if (appletFile.name != null) {
        commonMenuItems.push({
            name: appletFile.name,
            optionState: OptionState.UnSelectable,
        });
        commonMenuItems.push({
            name: (appletFile.name.toString() + 'divider') as any,
            optionState: OptionState.Divider,
        });
    }

    if (isLink(props.sMenu as any)) {
        return [
            ...commonMenuItems,
            {
                name: LocaleKey.openLinkInTab,
                onClick: props.openApp,
            },
            {
                name: LocaleKey.openLinkInWindow,
                onClick: () => openExternalInNewWindow((props.sMenu as any)?.meta?.external),
            },
            {
                name: LocaleKey.openInBrowser,
                optionState: OptionState.Disabled,
            }
        ];
    }
    const menuItems: Array<IContextMenuItemProps> = [
        ...commonMenuItems,
        {
            name: LocaleKey.runApplication,
            onClick: props.openApp,
        },
        {
            name: LocaleKey.runAsAdministrator,
            optionState: OptionState.Disabled,
        }
    ];

    if (props.showUninstall === true || props.openAppProperties != null) {
        menuItems.push({
            name: 'uninstall divider' as any,
            optionState: OptionState.Divider,
        });
    }

    if (props.openAppProperties != null) {
        menuItems.push({
            name: LocaleKey.properties,
            icon: InfoOutlineIcon,
            onClick: props.openAppProperties,
        });
    }

    if (props.showUninstall === true) {
        menuItems.push({
            name: LocaleKey.uninstall,
            optionState: OptionState.Disabled,
            icon: TrashIcon,
        });
    }

    return menuItems;
}