import { isLink, IStartMenuItemProps } from '../../../contracts/interface/IFile';
import { openExternalInNewWindow } from '../../../helper/linkHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { IContextMenuItemProps, OptionState } from '../../core/contextMenu';

export const getContextWrapperItems = (sMenu: IStartMenuItemProps, openApp: (e: any) => void) => {
    if (isLink(sMenu as any)) {
        return [
            {
                name: LocaleKey.openLinkInTab,
                onClick: openApp,
            },
            {
                name: LocaleKey.openLinkInWindow,
                onClick: () => openExternalInNewWindow((sMenu as any)?.meta?.external),
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
            onClick: openApp,
        },
        {
            name: LocaleKey.runAsAdministrator,
            optionState: OptionState.Disabled,
        }
    ];

    return menuItems;
}