import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../../components/core/image';
import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';

interface IProps {
    index: number;
    iconData: IAppletFile;
    selectedIconIndexes: Array<number>
    setSelected: (index: number) => (e: any) => void;
    openApp: (index: number) => (e: any) => void;
}

export const DesktopIcon: React.FC<IProps> = (props: IProps) => {
    const classes = classNames('desktop-icon-slot noselect', {
        'selected': props.selectedIconIndexes.includes(props.index)
    });
    return (
        <div
            key={props.iconData.imgUrl}
            data-index={props.index}
            className={classes}
            draggable={false}
            // onClick={props?.setSelected?.(props.index)}
            onDoubleClick={props?.openApp?.(props.index)}>
            <BasicImage
                imageUrl={props.iconData.imgUrl}
                alt={props.iconData.name}
            />
            <p draggable={false}>{translate(props.iconData.name)}</p>
        </div>
    );
}

