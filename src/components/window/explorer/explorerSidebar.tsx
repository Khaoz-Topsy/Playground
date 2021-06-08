import React from 'react';
import { DownloadIcon } from '@chakra-ui/icons';
import { BeakerIcon } from '@heroicons/react/solid'

interface IProps {
}

export const ExplorerSidebar: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="explorer-sidebar">
            <div className="item"><DownloadIcon />&nbsp;&nbsp;Documents</div>
            <div className="item"><DownloadIcon />&nbsp;&nbsp;Music</div>
            <div className="item"><DownloadIcon />&nbsp;&nbsp;Photos</div>
        </div>
    );
}

