import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { LaunchedApp } from '../../../contracts/launchedApp';
import { windowTaskbarIcon } from '../../window/windowIcon';

interface IProps {
    index: number;
    selected?: boolean;
    applet: LaunchedApp;
    openApp: (index: number) => (e: any) => void;
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
    const classes = classNames('applet-shortcut open noselect', {
        'minimised': (props.applet.meta.isMinimised ?? false),
        'selected': (props.selected ?? false),
        'initial': initial,
    });
    return (
        <motion.div
            key={props.applet.appletType}
            className={classes}
            initial={variants.initial}
            transition={{ duration: 0.5 }}
            animate={(props.applet.meta.isMinimised ?? false) ? "minimised" : "open"}
            variants={variants}
            exit={variants.closed}
        >
            <div onClick={props?.openApp?.(props.applet.appletType)}>
                {windowTaskbarIcon(props.applet.appletType)}
            </div>
        </motion.div>
    );
}

