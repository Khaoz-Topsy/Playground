import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { FileType, IAppletFile, IFile } from '../../../contracts/interface/IFile';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { AppletIcon, FileIcon } from '../../../constants/appImage';
import { explorerSelect } from '../../../constants/enum/customWindowEvent';
import { translate } from '../../../integration/i18n';
import { windowIcon } from '../windowIcon';

interface IProps {
    index: number;
    isSelected: boolean;
    iconData: IAppletFile | IFile | IFolder;
    setSelected: (id: number) => void;
    openFileOrFolder: (file: IAppletFile | IFile | IFolder) => (e: any) => void;
}

export const ExplorerIcon: React.FC<IProps> = (props: IProps) => {
    const classes = classNames('explorer-icon noselect', {
        'selected': props.isSelected
    });

    const clickFileOrFolder = (e: any) => {
        e.customEvent = explorerSelect;
        props?.setSelected?.(props.iconData.id)
    }

    const doubleClickFileOrFolder = (iconData: IAppletFile | IFile | IFolder) => (e: any) => {
        props?.openFileOrFolder?.(iconData)?.(e);
    }

    const renderFileMiniImage = (iconData: IAppletFile | IFile | IFolder) => {
        if (isFolder(iconData)) return;

        const file = iconData as IFile;
        if (file.type === FileType.link) return (
            <BasicImage
                imageUrl={FileIcon.miniLink}
                classNames="mini"
                alt={`${iconData.name}-mini`}
            />
        );

        return;
    }

    const renderImage = (iconData: IAppletFile | IFile | IFolder) => {
        if (isFolder(iconData)) {
            const folder = iconData as IFolder;
            if (iconData.imgUrl != null) return <BasicImage imageUrl={iconData.imgUrl} alt={folder.name.toString()} />;
            return <BasicImage imageUrl={AppletIcon.folder} alt={folder.name.toString()} />;
        }
        if (iconData.imgUrl != null) return <BasicImage imageUrl={iconData.imgUrl} alt={iconData.name.toString()} />;
        return windowIcon((iconData as any)?.appletType);
    }

    return (
        <div
            key={`${props.index}-${props.iconData.name}`}
            data-index={props.index}
            className={classes}
            draggable={false}
            onClick={clickFileOrFolder}
            onDoubleClick={doubleClickFileOrFolder(props.iconData)}>
            <div className="img-container">
                {renderImage(props.iconData)}
                {renderFileMiniImage(props.iconData)}
            </div>
            <p draggable={false}>{translate(props.iconData.name)}</p>
        </div>
    );
}

