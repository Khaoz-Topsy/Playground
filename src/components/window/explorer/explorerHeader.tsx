import React, { ReactNode } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Button } from '@chakra-ui/react';

import { IBreadcrumb } from '../../../contracts/interface/IBreadcrumb';
import { IFolder } from '../../../contracts/interface/IFolder';
import { IFile } from '../../../contracts/interface/IFile';
import { filesOnDisk } from '../../../constants/filesOnDisk';

import { searchFilesOnDisk } from '../../../helper/fileHelper';
import { WindowActions } from '../windowActions';

interface IProps {
    selectedId: number;
    windowIcon: ReactNode;
    breadcrumbs: Array<IBreadcrumb>;
    openFileOrFolder: (file: IFolder | IFile) => (e: any) => void;

    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}

export const ExplorerHeader: React.FC<IProps> = (props: IProps) => {

    const onBreadCrumbClick = (id: number) => (e: any) => {
        if (id === props.selectedId) return;
        const file = searchFilesOnDisk(filesOnDisk, id);
        if (file == null) return;
        props.openFileOrFolder?.(file)(e);
    }

    const displayBreadcrumb = (bread: IBreadcrumb) => {
        if (bread.isActive && props.breadcrumbs.length > 1) {
            return (
                <Button color="blue.400" variant="ghost" padding={2}
                    onClick={onBreadCrumbClick(bread.id)}
                    _hover={{ backgroundColor: 'blackAlpha.200' }}
                    _active={{ backgroundColor: 'blackAlpha.200' }}
                >{bread.name}</Button>
            );
        }
        return (
            <Button color="whiteAlpha.800" variant="ghost" padding={2}
                onClick={onBreadCrumbClick(bread.id)}
                _hover={{ backgroundColor: 'blackAlpha.200' }}
                _active={{ backgroundColor: 'blackAlpha.200' }}
            >{bread.name}</Button>
        );
    }

    return (
        <div className="window-header explorer">
            <div className="window-icon">
                {props.windowIcon}
            </div>
            <div className="v-divider icon-space"></div>
            <div className="icon-button disabled"><ArrowBackIcon /></div>
            <div className="icon-button disabled"><ArrowForwardIcon /></div>
            <div className="content noselect" style={{ marginRight: '1.25em' }}>
                <Breadcrumb style={{ marginTop: '2px' }} spacing="0" separator={<ChevronRightIcon color="gray.500" />}>
                    {
                        props.breadcrumbs.map((bread: IBreadcrumb) => (
                            <BreadcrumbItem key={`${bread.id}-${bread.name}`}>
                                {displayBreadcrumb(bread)}
                            </BreadcrumbItem>
                        ))
                    }
                </Breadcrumb>
            </div>
            {/* <div className="icon-button disabled" style={{ marginRight: '1.25em' }}><SearchIcon /></div> */}
            <WindowActions {...props} />
        </div>
    );
}

