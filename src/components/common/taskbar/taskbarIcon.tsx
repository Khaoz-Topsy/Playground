import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { isNotLaunched, LaunchedApp, NotLaunchedApp } from '../../../contracts/launchedApp';
import { windowTaskbarIcon } from '../../window/windowIcon';
import { ContextMenuWrapper, IContextMenuItemProps, OptionState } from '../../core/contextMenu';
import { LocaleKey } from '../../../localization/LocaleKey';

interface IProps {
    index: number;
    selected?: boolean;
    applet: LaunchedApp | NotLaunchedApp;
    openApp: (app: LaunchedApp | NotLaunchedApp) => (e: any) => void;
    closeApp: (app: LaunchedApp | NotLaunchedApp) => (e: any) => void;
}

export const TaskbarIcon: React.FC<IProps> = (props: IProps) => {
    const [initial, setInitial] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setInitial(!initial);
        }, 400)
        // eslint-disable-next-line
    }, []);

    const variants = {
        initial: {
            scale: 0, opacity: 0, width: '4.5em',
        },
        open: {
            scale: 1, opacity: 1, width: '4.5em',
        },
        minimised: {
            scale: 1, opacity: 1, width: '4.5em',
        },
        closed: {
            // scale: 1, scaleX: 0, opacity: 0, width: 0,
            scale: 1, opacity: 0,
        },
    }
    const isMaximised = (props.applet.meta.isMaximised ?? false);
    const isMinimised = (props.applet.meta.isMinimised ?? false);
    const isSelected = (props.selected ?? false);
    const isOpen = !isNotLaunched(props.applet);
    const classes = classNames('applet-shortcut taskbar-highlight-on-hover noselect', {
        'open': isOpen,
        'minimised': isMinimised,
        'selected': isSelected,
        'initial': initial,
    });

    const getContextWrapperItems = (applet: LaunchedApp | NotLaunchedApp) => {
        const menuItems: Array<IContextMenuItemProps> = [
            {
                name: LocaleKey.runApplication,
                optionState: (isMinimised || isSelected || isOpen) ? OptionState.Disabled : undefined,
                onClick: props?.openApp?.(applet),
            },
            {
                name: LocaleKey.runAsAdministrator,
                optionState: OptionState.Disabled,
            }
        ];

        if (isMinimised === false && isOpen === true) {
            menuItems.push({
                name: LocaleKey.minimise,
                onClick: props?.openApp?.(applet),
            });
        }

        if (isMinimised === true && isMaximised === false && isOpen === true) {
            menuItems.push({
                name: LocaleKey.maximise,
                onClick: props?.openApp?.(applet),
            });
        }

        if (isOpen === true) {
            menuItems.push({
                name: 'kill app divider' as any,
                optionState: OptionState.Divider,
            });
            menuItems.push({
                name: LocaleKey.killApp,
                optionState: OptionState.Important,
                onClick: props?.closeApp?.(applet),
            });
        }
        return menuItems;
    }

    return (
        <motion.div
            key={props.applet.appletType}
            className={classes}
            initial={variants.initial}
            transition={{ duration: 0.5 }}
            animate={isMinimised ? "minimised" : "open"}
            variants={variants}
            exit={variants.closed}
        >
            <ContextMenuWrapper
                onClick={props?.openApp?.(props.applet)}
                items={getContextWrapperItems(props.applet)}
            >
                <div onClick={props?.openApp?.(props.applet)}>
                    {windowTaskbarIcon(props.applet.appletType)}
                </div>
            </ContextMenuWrapper>
        </motion.div>
    );
}

