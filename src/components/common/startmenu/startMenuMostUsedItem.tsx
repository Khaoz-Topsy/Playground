import React from 'react';

import { ContextMenuWrapper } from '../../core/contextMenu';
import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { windowIcon } from '../../window/windowIcon';
import { getContextWrapperItems } from './startMenuContextMenuItems';

interface IProps extends IAppletFile {
    onClick: (e: any) => void;
    openAppProperties: () => void;
}

export const StartMenuMostUsedItem: React.FC<IProps> = (props: IProps) => {
    return (
        <ContextMenuWrapper
            key={props.id}
            baseKey={props.id.toString()}
            items={getContextWrapperItems({
                sMenu: props as any,
                openApp: props?.onClick,
                openAppProperties: props?.openAppProperties,
            })}
        >
            <li onClick={props?.onClick}>
                {windowIcon(props.appletType)}
                <span className="noselect">{translate(props.name)}</span>
            </li>
        </ContextMenuWrapper>
    );
}

