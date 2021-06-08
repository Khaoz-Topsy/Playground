import React, { ReactNode } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Button } from '@chakra-ui/react';
import { WindowActions } from '../windowActions';

// import { WindowActions } from './windowActions';

interface IProps {
    windowIcon: ReactNode;
    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}

export const ExplorerHeader: React.FC<IProps> = (props: IProps) => {

    const notActiveBreadcrumb = (name: string) => {
        return (
            <BreadcrumbItem>
                <Button color="whiteAlpha.800" variant="ghost" padding={2}
                    _hover={{ backgroundColor: 'blackAlpha.200' }}
                    _active={{ backgroundColor: 'blackAlpha.200' }}
                >{name}</Button>
            </BreadcrumbItem>
        );
    }

    const activeBreadcrumb = (name: string) => {
        return (
            <BreadcrumbItem>
                <Button color="blue.400" variant="ghost" padding={2}
                    _hover={{ backgroundColor: 'blackAlpha.200' }}
                    _active={{ backgroundColor: 'blackAlpha.200' }}
                >{name}</Button>
            </BreadcrumbItem>
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
                    {notActiveBreadcrumb('Home')}
                    {notActiveBreadcrumb('Docs')}
                    {activeBreadcrumb('Details')}
                </Breadcrumb>
            </div>
            {/* <div className="icon-button disabled" style={{ marginRight: '1.25em' }}><SearchIcon /></div> */}
            <WindowActions {...props} />
        </div>
    );
}

