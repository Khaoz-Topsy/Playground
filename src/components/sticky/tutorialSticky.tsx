import React from 'react';
import { Box } from '@chakra-ui/react';

import { CustomCheckbox } from '../core/checkbox';
import { Sticky } from './sticky';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps { }


export const TutorialSticky: React.FC<IProps> = (props: IProps) => {
    return (
        <Sticky classNames="tutorial">
            <Box className="noselect">
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
        </Sticky>
    );
}

export const renderCheckbox = (title: LocaleKey) => {
    return (
        <Box key={title} mb={2}>
            <CustomCheckbox name={title} />
        </Box>
    );
}

