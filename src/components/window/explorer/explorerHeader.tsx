import React, { ReactNode, useEffect } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Button, Center } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';

import { knownKeybinds } from '../../../constants/keybind';
import { IBreadcrumb } from '../../../contracts/interface/IBreadcrumb';
import { IFolder } from '../../../contracts/interface/IFolder';
import { IFile } from '../../../contracts/interface/IFile';
import { AnimatedIconButton } from '../../../components/common/button';
import { withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { searchFilesOnDisk } from '../../../helper/fileHelper';

import { dependencyInjectionToProps, IExpectedServices } from './explorer.dependencyInjection';
import { WindowActions } from '../windowActions';

interface IWithoutExpectedServices {
    selectedId: number;
    currentChangeIndex: number;
    windowIcon: ReactNode;
    breadcrumbs: Array<IBreadcrumb>;
    hasPrev: boolean;
    hasNext: boolean;
    goToPrev: () => void;
    goToNext: () => void;
    openFileOrFolder: (file: IFolder | IFile) => (e: any) => void;

    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const ExplorerHeaderUnconnected: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        Mousetrap.bind(knownKeybinds.goPrev, onPrevClick);
        Mousetrap.bind(knownKeybinds.goNext, onNextClick);

        return () => {
            Mousetrap.unbind(knownKeybinds.goPrev);
            Mousetrap.unbind(knownKeybinds.goNext);
        }
        // eslint-disable-next-line
    }, [props.currentChangeIndex]);

    const onPrevClick = (e: any) => {
        e.preventDefault?.();
        if (!props.hasPrev) return;
        props.goToPrev?.();
    }

    const onNextClick = (e: any) => {
        e.preventDefault?.();
        if (!props.hasNext) return;
        props.goToNext?.();
    }

    const onBreadCrumbClick = (id: number) => (e: any) => {
        if (id === props.selectedId) return;
        const file = searchFilesOnDisk(props.folderStructure, id);
        if (file == null) return;
        props.openFileOrFolder?.(file)(e);
    }

    const displayBreadcrumb = (bread: IBreadcrumb) => {
        const name = translate(bread.name);
        if (bread.isActive && props.breadcrumbs.length > 1) {
            return (
                <Button color="blue.400" variant="ghost" padding={2}
                    disabled={true}
                    _hover={{ backgroundColor: 'blackAlpha.200' }}
                    _active={{ backgroundColor: 'blackAlpha.200' }}
                >{name}</Button>
            );
        }
        return (
            <Button color="whiteAlpha.800" variant="ghost" padding={2}
                onClick={onBreadCrumbClick(bread.id)}
                _hover={{ backgroundColor: 'blackAlpha.200' }}
                _active={{ backgroundColor: 'blackAlpha.200' }}
            >{name}</Button>
        );
    }

    return (
        <div className="window-header explorer">
            <div className="window-icon">
                {props.windowIcon}
            </div>
            <div className="v-divider icon-space"></div>

            <AnimatedIconButton
                icon={<ArrowBackIcon />}
                disabled={!props.hasPrev}
                onClick={onPrevClick}
            />
            <AnimatedIconButton
                icon={<ArrowForwardIcon />}
                disabled={!props.hasNext}
                onClick={onNextClick}
            />

            <div className="content noselect">
                <Center height="100%">
                    <Breadcrumb style={{ marginBottom: '5px', pointerEvents: 'all' }} spacing="0" separator={<ChevronRightIcon color="#9E9E9E" mx={5} />}>
                        {
                            props.breadcrumbs.map((bread: IBreadcrumb) => (
                                <BreadcrumbItem key={`${bread.id}-${bread.name}`}>
                                    {displayBreadcrumb(bread)}
                                </BreadcrumbItem>
                            ))
                        }
                    </Breadcrumb>
                </Center>
            </div>
            {/* <div className="icon-button disabled" style={{ marginRight: '1.25em' }}><SearchIcon /></div> */}
            <WindowActions {...props} />
        </div>
    );
}

export const ExplorerHeader = withServices<IWithoutExpectedServices, IExpectedServices>(
    ExplorerHeaderUnconnected,
    dependencyInjectionToProps
);
