import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../../components/core/image';
import { IDesktopIcon } from '../../../contracts/interface/IDesktopIcon';

interface IProps {
    index: number;
    iconData: IDesktopIcon;
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
                alt={props.iconData.title}
            />
            <p draggable={false}>{props.iconData.title}</p>
        </div>
    );
}

