import React from 'react';

import { BasicImage } from '../../core/image';
import { IAppletFile } from '../../../contracts/interface/IFile';

interface IProps extends IAppletFile { }

export const StartMenuMostUsedItem: React.FC<IProps> = (props: IProps) => {
    return (
        <li key={props.id}>
            <BasicImage imageUrl={props.imgUrl} />
            <span className="noselect">{props.name}</span>
        </li>
    );
}

