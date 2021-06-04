import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { windowTaskbarIcon } from '../../window/windowIcon';
import { LaunchedApp } from '../../../contracts/launchedApp';
import { motion } from 'framer-motion';

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
        initial: { scale: 0, opacity: 0, marginTop: '100%' },
        open: { scale: 1, opacity: 1, marginTop: 0 },
        minimised: { scale: 1, opacity: 1, marginTop: 0 },
        closed: { scale: 0, opacity: 0, marginTop: 0 },
    }
    const classes = classNames('applet-shortcut open noselect', {
        'minimised': (props.applet.meta.isMinimised ?? false),
        'selected': (props.selected ?? false),
        'initial': initial,
    });
    return (
        <div className={classes} onClick={props?.openApp?.(props.applet.appType)}>
            <motion.div
                key={props.applet.appType}
                initial={variants.initial}
                transition={{ duration: 0.5 }}
                animate={(props.applet.meta.isMinimised ?? false) ? "minimised" : "open"}
                variants={variants}
                exit={variants.closed}
            >
                {windowTaskbarIcon(props.applet.appType)}
            </motion.div>
        </div>
    );
}

