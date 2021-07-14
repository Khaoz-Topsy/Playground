import React from 'react';
import classNames from 'classnames';

import { BasicImage, BasicLazyImage } from '../../core/image';
import { ContextMenuWrapper, OptionState } from '../../core/contextMenu';
import { FileType, IAppletFile, IFile, isApplet, isLink } from '../../../contracts/interface/IFile';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { AppletIcon, FileIcon } from '../../../constants/appImage';
import { explorerSelect } from '../../../constants/enum/customWindowEvent';
import { translate } from '../../../integration/i18n';
import { openExternalInNewWindow } from '../../../helper/linkHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { windowIcon, windowIconString } from '../windowIcon';

interface IProps {
    index: number;
    isSelected: boolean;
    iconData: IAppletFile | IFile | IFolder;
    setSelected: (id: number) => void;
    openVirusModal: (fileName: LocaleKey, imgUrl?: string) => void;
    openFileOrFolder: (file: IAppletFile | IFile | IFolder) => (e: any) => void;
}

export const ExplorerIcon: React.FC<IProps> = (props: IProps) => {
    const classes = classNames('explorer-icon noselect', {
        'selected': props.isSelected
    });

    const clickFileOrFolder = (e?: any) => {
        if (e != null) e.customEvent = explorerSelect;
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
        if (iconData.imgUrl != null) return <BasicLazyImage imageUrl={iconData.imgUrl} alt={iconData.name.toString()} />;
        return windowIcon((iconData as any)?.appletType);
    }

    // const renderFileOrFolder = (iconData: IAppletFile | IFile | IFolder) => {
    //     return (
    //         <ContextMenuWrapper
    //             onContextOpen={clickFileOrFolder}
    //             items={getContextWrapperItems(iconData)}
    //         >
    //             <div className="img-container">
    //                 {renderImage(iconData)}
    //                 {renderFileMiniImage(iconData)}
    //             </div>
    //             <p draggable={false}>{translate(iconData.name)}</p>
    //         </ContextMenuWrapper>
    //     );
    // }

    // TODO - translate all these \/
    const getContextWrapperItems = (iconData: IAppletFile | IFile | IFolder) => {
        if (isFolder(iconData)) {
            return [
                {
                    name: 'Open directory',
                    onClick: doubleClickFileOrFolder(iconData),
                },
                {
                    name: 'Open in Terminal',
                    optionState: OptionState.Disabled,
                }
            ];
        }

        if (isLink(iconData)) {
            return [
                {
                    name: 'Open link in new tab',
                    onClick: doubleClickFileOrFolder(iconData),
                },
                {
                    name: 'Open link in new window',
                    onClick: () => openExternalInNewWindow((iconData as IAppletFile)?.meta?.external),
                },
                {
                    name: 'Open in browser',
                    optionState: OptionState.Disabled,
                }
            ];
        }

        if (isApplet(iconData)) {
            const applet = iconData as IAppletFile;
            return [
                {
                    name: 'Run application',
                    onClick: doubleClickFileOrFolder(applet),
                },
                {
                    name: 'Run as administrator',
                    optionState: OptionState.Disabled,
                },
                {
                    name: 'Scan for viruses',
                    optionState: OptionState.Important,
                    onClick: () => props.openVirusModal(applet.name, windowIconString(applet.appletType)),
                }
            ];
        }

        return [
            {
                name: 'Open File',
                onClick: doubleClickFileOrFolder(iconData),
            },
            {
                name: 'Copy',
                optionState: OptionState.Disabled,
            },
            {
                name: 'Paste',
                optionState: OptionState.Disabled,
            },
            {
                name: 'Delete',
                optionState: OptionState.Disabled,
            }
        ];
    }

    return (
        <div
            key={`${props.index}-${props.iconData.name}`}
            data-index={props.index}
            className={classes}
            draggable={false}
            onClick={clickFileOrFolder}
            onDoubleClick={doubleClickFileOrFolder(props.iconData)}>
            <ContextMenuWrapper
                onContextOpen={clickFileOrFolder}
                items={getContextWrapperItems(props.iconData)}
            >
                <div className="img-container">
                    {renderImage(props.iconData)}
                    {renderFileMiniImage(props.iconData)}
                </div>
                <p draggable={false}>{translate(props.iconData.name)}</p>
            </ContextMenuWrapper>
        </div>
    );
}

