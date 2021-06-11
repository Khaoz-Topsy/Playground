import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { FolderIcon, MusicNoteIcon, PhotographIcon } from '@heroicons/react/solid'

import { IFolder } from '../../../contracts/interface/IFolder';
import { IFile } from '../../../contracts/interface/IFile';
import { documentFolder } from '../../../constants/filesOnDisk';

interface IProps {
    openFileOrFolder: (file: IFolder | IFile) => (e: any) => void;
}

export const ExplorerSidebar: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="explorer-sidebar noselect">
            <div className="item" onClick={props.openFileOrFolder?.(documentFolder)}>
                <Icon as={FolderIcon} />&nbsp;&nbsp;Documents
                </div>
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

