import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { FolderIcon, MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/solid';
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
import { Center, Flex } from '@chakra-ui/layout';

interface IWithoutExpectedServices {
    currentFolder: IFolder;
    openFileOrFolder: (file: IAppletFile | IFolder | IFile) => (e: any) => void;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const ExplorerSidebarUnconnected: React.FC<IProps> = (props: IProps) => {
    const applicationFolder = searchFilesOnDisk(props.folderStructure, applicationFolderId);
    const desktopFolder = searchFilesOnDisk(props.folderStructure, desktopFolderId);
    const documentFolder = searchFilesOnDisk(props.folderStructure, documentFolderId);

    const renderSidebarTile = (icon: any, title: LocaleKey) => (
        <Flex direction="row">
            <Center><Icon as={icon} /></Center>
            <span>&nbsp;&nbsp;{translate(title)}</span>
        </Flex>
    );

    return (
        <div className="explorer-sidebar noselect">
            {
                (applicationFolder != null) &&
                <div
                    className={classNames('item', { 'selected': props.currentFolder.id === applicationFolderId })}
                    onClick={props.openFileOrFolder?.(applicationFolder)}
                >
                    <Flex direction="row">
                        <Center><BasicImage classNames="explorer-shortcut-icon" imageUrl={FileIcon.applicationIcon} /></Center>
                        <span>&nbsp;&nbsp;{translate(LocaleKey.applications)}</span>
                    </Flex>
                </div>
            }
            {
                (desktopFolder != null) &&
                <div
                    className={classNames('item', { 'selected': props.currentFolder.id === desktopFolderId })}
                    onClick={props.openFileOrFolder?.(desktopFolder)}
                >
                    {renderSidebarTile(FolderIcon, LocaleKey.desktop)}
                </div>
            }
            {
                (documentFolder != null) &&
                <div
                    className={classNames('item', { 'selected': props.currentFolder.id === documentFolderId })}
                    onClick={props.openFileOrFolder?.(documentFolder)}
                >
                    {renderSidebarTile(FolderIcon, LocaleKey.documents)}
                </div>
            }
            <div className="item" onClick={props.openFileOrFolder?.(KnownApplets.musicPlayer)}>
                {renderSidebarTile(MusicalNoteIcon, KnownApplets.musicPlayer.name)}
            </div>
            <div className="item" onClick={props.openFileOrFolder?.(KnownApplets.picture)}>
                {renderSidebarTile(PhotoIcon, KnownApplets.picture.name)}
            </div>
            <hr />
        </div>
    );
}

export const ExplorerSidebar = withServices<IWithoutExpectedServices, IExpectedServices>(
    ExplorerSidebarUnconnected,
    dependencyInjectionToProps
);

