import React from 'react';

import { BasicImage } from '../../core/image';
import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';

interface IProps extends IAppletFile { }

export const StartMenuMostUsedItem: React.FC<IProps> = (props: IProps) => {
    return (
        <li key={props.id}>
            <BasicImage imageUrl={props.imgUrl} />
            <span className="noselect">{translate(props.name)}</span>
        </li>
    );
}

