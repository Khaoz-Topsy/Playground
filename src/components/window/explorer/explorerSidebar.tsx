import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { FolderIcon, MusicNoteIcon, PhotographIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { FileIcon } from '../../../constants/appImage';
import { KnownApplets } from '../../../constants/knownApplets';
import { IFolder } from '../../../contracts/interface/IFolder';
import { IAppletFile, IFile } from '../../../contracts/interface/IFile';
import { applicationFolderId, desktopFolderId, documentFolderId } from '../../../constants/filesOnDisk';
import { searchFilesOnDisk } from '../../../helper/fileHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../integration/i18n';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './explorer.dependencyInjection';

interface IWithoutExpectedServices {
    currentFolder: IFolder;
    openFileOrFolder: (file: IAppletFile | IFolder | IFile) => (e: any) => void;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const ExplorerSidebarUnconnected: React.FC<IProps> = (props: IProps) => {
    const applicationFolder = searchFilesOnDisk(props.folderStructure, applicationFolderId);
    const desktopFolder = searchFilesOnDisk(props.folderStructure, desktopFolderId);
    const documentFolder = searchFilesOnDisk(props.folderStructure, documentFolderId);

    return (
        <div className="explorer-sidebar noselect">
            {
                (applicationFolder != null) &&
                <div
                    className={classNames('item', { 'selected': props.currentFolder.id === applicationFolderId })}
                    onClick={props.openFileOrFolder?.(applicationFolder)}
                >
                    <BasicImage classNames="explorer-shortcut-icon" imageUrl={FileIcon.applicationIcon} />&nbsp;&nbsp;{translate(LocaleKey.applications)}
                </div>
            }
            {
                (desktopFolder != null) &&
                <div
                    className={classNames('item', { 'selected': props.currentFolder.id === desktopFolderId })}
                    onClick={props.openFileOrFolder?.(desktopFolder)}
                >
                    <Icon as={FolderIcon} />&nbsp;&nbsp;{translate(LocaleKey.desktop)}
                </div>
            }
            {
                (documentFolder != null) &&
                <div
                    className={classNames('item', { 'selected': props.currentFolder.id === documentFolderId })}
                    onClick={props.openFileOrFolder?.(documentFolder)}
                >
                    <Icon as={FolderIcon} />&nbsp;&nbsp;{translate(LocaleKey.documents)}
                </div>
            }
            <div className="item" onClick={props.openFileOrFolder?.(KnownApplets.musicPlayer)}>
                <Icon as={MusicNoteIcon} />&nbsp;&nbsp;{translate(KnownApplets.musicPlayer.name)}
            </div>
            <div className="item" onClick={props.openFileOrFolder?.(KnownApplets.picture)}>
                <Icon as={PhotographIcon} />&nbsp;&nbsp;{translate(KnownApplets.picture.name)}
            </div>
            <hr />
        </div>
    );
}

export const ExplorerSidebar = withServices<IWithoutExpectedServices, IExpectedServices>(
    ExplorerSidebarUnconnected,
    dependencyInjectionToProps
);

