import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const navButtonAnimDuration = 250;

const navButtonAnimVariants = {
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

interface IAnimatedNavButtonProps {
    disabled: boolean;
    icon: ReactNode;
    onClick: (e: any) => void;
}
export const AnimatedIconButton: React.FC<IAnimatedNavButtonProps> = (props: IAnimatedNavButtonProps) => {
    const [isActivated, setIsActivated] = useState<boolean>(false);

    const onClick = (e: any) => {
        e.preventDefault?.();
        if (props?.onClick == null) return;
        setIsActivated(true);
        props.onClick?.(e);
        setTimeout(() => setIsActivated(false), navButtonAnimDuration);
    }

    return (
        <motion.div
            initial={navButtonAnimVariants.initial}
            transition={{ duration: 100 / navButtonAnimDuration }}
            animate={isActivated ? 'activated' : 'resting'}
            variants={navButtonAnimVariants}
            exit={navButtonAnimVariants.resting}
            className={classNames('icon-button', { 'disabled': props.disabled })}
            onClick={onClick}
        >
            {props.icon}
        </motion.div>
    );
}