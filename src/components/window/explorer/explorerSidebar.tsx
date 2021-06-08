import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { FolderIcon, MusicNoteIcon, PhotographIcon } from '@heroicons/react/solid'

interface IProps {
}

export const ExplorerSidebar: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="explorer-sidebar">
            <div className="item"><Icon as={FolderIcon} />&nbsp;&nbsp;Documents</div>
            <div className="item"><Icon as={MusicNoteIcon} />&nbsp;&nbsp;Music</div>
            <div className="item"><Icon as={PhotographIcon} />&nbsp;&nbsp;Photos</div>
            <hr />
        </div>
    );
}

