import React from 'react';
import { Box, Skeleton, Stack, Tooltip } from '@chakra-ui/react';

import { CustomCheckbox } from '../core/checkbox';
import { translate } from '../../integration/i18n';
import { LocaleKey } from '../../localization/LocaleKey';

interface IHiddenSecretsFoundCheckbox { }
export const HiddenSecretsFoundCheckbox: React.FC<IHiddenSecretsFoundCheckbox> = (props: IHiddenSecretsFoundCheckbox) => {
    return (
        <CustomCheckbox isChecked={false}>
            <Skeleton height="20px" width="100px" startColor="gray.500" endColor="gray.500" />
        </CustomCheckbox>
    );
}

interface IHiddenSecretsFoundCheckboxWithDescrip { }
export const HiddenSecretsFoundCheckboxWithDescrip: React.FC<IHiddenSecretsFoundCheckboxWithDescrip> = (props: IHiddenSecretsFoundCheckboxWithDescrip) => {
    return (
        <Tooltip hasArrow label={translate(LocaleKey.secretTooltipDescription)}
            placement="top-start" aria-label="Tooltip about the hidden secret">
            <Stack>
                <Box><HiddenSecretsFoundCheckbox /></Box>
                <Skeleton height="20px" width="50%" style={{ marginLeft: '1.5em' }} startColor="gray.500" endColor="gray.500" />
            </Stack>
        </Tooltip>
    );
}

interface IHiddenSecretsFoundKeybind { }
export const HiddenSecretsFoundKeybind: React.FC<IHiddenSecretsFoundKeybind> = (props: IHiddenSecretsFoundKeybind) => {
    return (
        <Tooltip hasArrow label={translate(LocaleKey.secretTooltipDescription)} placement="bottom-start" aria-label="Tooltip about the hidden secret">
            <Box>
                <Skeleton display="inline-block" mb={-1.5} height="20px" width="60%" startColor="gray.500" endColor="gray.500" />
            </Box>
        </Tooltip>
    );
}