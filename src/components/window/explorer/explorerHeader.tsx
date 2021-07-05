import React, { ReactNode, useEffect, useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Button } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { IBreadcrumb } from '../../../contracts/interface/IBreadcrumb';
import { IFolder } from '../../../contracts/interface/IFolder';
import { IFile } from '../../../contracts/interface/IFile';
import { withServices } from '../../../integration/dependencyInjection';

import { searchFilesOnDisk } from '../../../helper/fileHelper';
import { WindowActions } from '../windowActions';
import { dependencyInjectionToProps, IExpectedServices } from './explorer.dependencyInjection';
import { translate } from '../../../integration/i18n';
import { knownKeybinds } from '../../../constants/keybind';

const navButtonAnimDuration = 250;

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
    const [prevActivated, setPrevActivated] = useState<boolean>(false);
    const [nextActivated, setNextActivated] = useState<boolean>(false);

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
        console.log(props.currentChangeIndex);
        if (!props.hasPrev) return;
        setPrevActivated(true);
        props.goToPrev?.();
        setTimeout(() => setPrevActivated(false), navButtonAnimDuration);
    }

    const onNextClick = (e: any) => {
        e.preventDefault?.();
        if (!props.hasNext) return;
        setNextActivated(true);
        props.goToNext?.();
        setTimeout(() => setNextActivated(false), navButtonAnimDuration);
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

    const variants = {
        initial: {
            scale: 0,
        },
        resting: {
            scale: 1,
        },
        activated: {
            scale: 1.2,
        },
    }

    return (
        <div className="window-header explorer">
            <div className="window-icon">
                {props.windowIcon}
            </div>
            <div className="v-divider icon-space"></div>


            <motion.div
                initial={variants.initial}
                transition={{ duration: 100 / navButtonAnimDuration }}
                animate={prevActivated ? 'activated' : 'resting'}
                variants={variants}
                exit={variants.resting}
                className={classNames('icon-button', { 'disabled': !props.hasPrev })}
                onClick={onPrevClick}
            >
                <ArrowBackIcon />
            </motion.div>

            <motion.div
                initial={variants.initial}
                transition={{ duration: 100 / navButtonAnimDuration }}
                animate={nextActivated ? 'activated' : 'resting'}
                variants={variants}
                exit={variants.resting}
                className={classNames('icon-button', { 'disabled': !props.hasNext })}
                onClick={onNextClick}
            >
                <ArrowForwardIcon />
            </motion.div>

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

export const ExplorerHeader = withServices<IWithoutExpectedServices, IExpectedServices>(
    ExplorerHeaderUnconnected,
    dependencyInjectionToProps
);
