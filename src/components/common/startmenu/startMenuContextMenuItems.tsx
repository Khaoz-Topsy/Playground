import { TrashIcon } from '@heroicons/react/solid';

import { IContextMenuItemProps, OptionState } from '../../core/contextMenu';
import { isLink, IStartMenuItemProps } from '../../../contracts/interface/IFile';
import { openExternalInNewWindow } from '../../../helper/linkHelper';
import { LocaleKey } from '../../../localization/LocaleKey';

interface IContextWrapperItems {
    sMenu: IStartMenuItemProps;
    showUninstall?: boolean;
    openApp: (e: any) => void
}
export const getContextWrapperItems = (props: IContextWrapperItems) => {
    if (isLink(props.sMenu as any)) {
        return [
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
        {
            name: LocaleKey.runApplication,
            onClick: props.openApp,
        },
        {
            name: LocaleKey.runAsAdministrator,
            optionState: OptionState.Disabled,
        }
    ];

    if (props.showUninstall === true) {
        menuItems.push({
            name: 'uninstall divider' as any,
            optionState: OptionState.Divider,
        });
        menuItems.push({
            name: LocaleKey.uninstall,
            optionState: OptionState.Disabled,
            icon: TrashIcon,
        });
    }

    return menuItems;
}