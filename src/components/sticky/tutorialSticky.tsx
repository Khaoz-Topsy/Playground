import React from 'react';
import { Box } from '@chakra-ui/react';

import { secretsFound } from '../../constants/secretsFound';
import { CustomCheckbox } from '../core/checkbox';
import { SecretStore } from '../../state/secrets/store';
import { Sticky } from './sticky';

interface IProps { }


export const TutorialSticky: React.FC<IProps> = (props: IProps) => {
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    // const activeApps: Array<LaunchedApp> = WindowStore.useState(store => store.activeApps);
    // const currentFocused: AppletType = WindowStore.useState(store => store.currentFocused);

    return (
        <Sticky classNames="tutorial">
            <Box className="noselect">
                <h1>Things to get done today:</h1>
                {
                    secretsFound.map(s => (
                        <Box key={s.name} mt={5} mb={5}>
                            <CustomCheckbox name={s.name} isChecked={s.isFound(currentSecretsFound)} />
                        </Box>
                    ))
                }
            </Box>
        </Sticky>
    );
}

