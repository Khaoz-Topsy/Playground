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
        <li key={props.id}>
            <ContextMenuWrapper
                baseKey={props.id.toString()}
                items={getContextWrapperItems({
                    sMenu: props as any,
                    openApp: props?.onClick,
                    openAppProperties: props?.openAppProperties,
                })}
            >
                {windowIcon(props.appletType, props?.onClick)}
                <span className="noselect" onClick={props?.onClick}>{translate(props.name)}</span>
            </ContextMenuWrapper>
        </li>
    );
}

