import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { IFile } from '../../../contracts/interface/IFile';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { AppletIcon } from '../../../constants/appImage';

interface IProps {
    index: number;
    isSelected: boolean;
    iconData: IFile | IFolder;
    setSelected: (id: number) => void;
    openFileOrFolder: (file: IFile | IFolder) => (e: any) => void;
}

export const ExplorerIcon: React.FC<IProps> = (props: IProps) => {
    const classes = classNames('explorer-icon noselect', {
        'selected': props.isSelected
    });

    const renderImage = (iconData: IFile | IFolder) => {
        if (isFolder(iconData)) {
            const folder = iconData as IFolder;
            if (iconData.imgUrl != null) return <BasicImage imageUrl={iconData.imgUrl} alt={folder.name} />;
            return <BasicImage imageUrl={AppletIcon.folder} alt={folder.name} />;
        }
        return <BasicImage imageUrl={iconData.imgUrl} alt={iconData.name} />;
    }

    const clickFileOrFolder = (e: any) => {
        e?.stopPropagation?.();
        props?.setSelected?.(props.iconData.id)
    }

    return (
        <div
            key={`${props.index}-${props.iconData.name}`}
            data-index={props.index}
            className={classes}
            draggable={false}
            onClick={clickFileOrFolder}
            onDoubleClick={props?.openFileOrFolder?.(props.iconData)}>
            <div className="img-container">
                {renderImage(props.iconData)}
            </div>
            <p draggable={false}>{props.iconData.name}</p>
        </div>
    );
}

