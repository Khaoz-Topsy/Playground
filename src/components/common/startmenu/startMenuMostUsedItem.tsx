import React from 'react';

import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { windowIcon } from '../../window/windowIcon';

interface IProps extends IAppletFile {
    onClick: (e: any) => void;
}

export const StartMenuMostUsedItem: React.FC<IProps> = (props: IProps) => {
    return (
        <li key={props.id} onClick={props.onClick}>
            {windowIcon(props.appletType)}
            <span className="noselect">{translate(props.name)}</span>
        </li>
    );
}

