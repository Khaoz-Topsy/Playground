import React from 'react';
import { Box } from '@chakra-ui/react';

import { secretsFound } from '../../constants/secretsFound';
import { CustomCheckbox } from '../core/checkbox';
import { SecretStore } from '../../state/secrets/store';
import { Sticky } from './sticky';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps { }


export const TutorialSticky: React.FC<IProps> = (props: IProps) => {
    return (
        <Sticky classNames="tutorial">
            <Box className="noselect">
                <h1>Things you can do:</h1>
                {renderCheckbox('Open StartMenu' as any)}
                {renderCheckbox('Open Applet from Desktop' as any)}
                {renderCheckbox('Open Applet from Taskbar' as any)}
            </Box>
        </Sticky>
    );
}

export const renderCheckbox = (title: LocaleKey) => {
    return (
        <Box key={title} my={2}>
            <CustomCheckbox name={title} />
        </Box>
    );
}

