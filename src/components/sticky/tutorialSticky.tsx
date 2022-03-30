import React from 'react';
import { Box, CloseButton } from '@chakra-ui/react';

import { CustomCheckbox } from '../core/checkbox';
import { Sticky } from './sticky';
import { LocaleKey } from '../../localization/LocaleKey';
import { motion } from 'framer-motion';

interface IProps {
    stickyVisible: boolean;
    setStickyVisible: (newValue: boolean) => void;
}


export const TutorialSticky: React.FC<IProps> = (props: IProps) => {
    const halfCardWidth = '175px';
    const variants = {
        open: { scale: 1, opacity: 1, marginRight: 0, marginTop: 0 },
        closed: { scale: 0, opacity: 0, marginRight: halfCardWidth, marginTop: halfCardWidth },
    }
    return (
        <motion.div
            key="motion-TutorialSticky"
            draggable="false"
            className="sticky-wrapper"
            initial={variants.closed}
            transition={{ duration: 0.5 }}
            animate={(props.stickyVisible ?? false) ? "open" : "closed"}
            variants={variants}
            exit={variants.closed}
        >
            <Sticky classNames="tutorial">
                <Box className="noselect mr1-5">
                    <b>Welcome! Here are some things you can do on this site</b>
                </Box>
                <hr />
                <Box className="noselect">
                    {renderCheckbox('Open the StartMenu' as any)}
                    {renderCheckbox('Open an App from Desktop' as any)}
                    {renderCheckbox('Open an App from Taskbar' as any)}
                    {renderCheckbox('Open the File Explorer and navigate through the files' as any)}
                    {renderCheckbox('Open the Settings App and customize' as any)}
                    {renderCheckbox('Try some keyboard shortcuts' as any)}
                    {renderCheckbox('Find some secrets' as any)}
                    {renderCheckbox('Send an Email' as any)}
                </Box>
                <CloseButton
                    position='absolute' right='8px' top='8px'
                    onClick={() => props.setStickyVisible(false)}
                />
            </Sticky>
        </motion.div>
    );
}

export const renderCheckbox = (title: LocaleKey) => {
    return (
        <Box key={title} mb={2}>
            <CustomCheckbox name={title} />
        </Box>
    );
}

