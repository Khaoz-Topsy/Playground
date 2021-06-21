import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { FolderIcon, MusicNoteIcon, PhotographIcon } from '@heroicons/react/solid'

import { IFolder } from '../../../contracts/interface/IFolder';
import { IFile } from '../../../contracts/interface/IFile';
import { documentFolderId } from '../../../constants/filesOnDisk';
import { searchFilesOnDisk } from '../../../helper/fileHelper';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './explorer.dependencyInjection';

interface IWithoutExpectedServices {
    openFileOrFolder: (file: IFolder | IFile) => (e: any) => void;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const ExplorerSidebarUnconnected: React.FC<IProps> = (props: IProps) => {
    const documentFolder = searchFilesOnDisk(props.folderStructure, documentFolderId);

    return (
        <div className="explorer-sidebar noselect">
            {
                (documentFolder != null) &&
                <div className="item" onClick={props.openFileOrFolder?.(documentFolder)}>
                    <Icon as={FolderIcon} />&nbsp;&nbsp;Documents
                </div>
            }
            <div className="item">
                <Icon as={MusicNoteIcon} />&nbsp;&nbsp;Music
            </div>
            <div className="item">
                <Icon as={PhotographIcon} />&nbsp;&nbsp;Photos
            </div>
            <hr />
        </div>
    );
}

export const ExplorerSidebar = withServices<IWithoutExpectedServices, IExpectedServices>(
    ExplorerSidebarUnconnected,
    dependencyInjectionToProps
);

