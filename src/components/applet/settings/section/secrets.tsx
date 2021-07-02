import React from 'react';
import { Box, Text, Checkbox } from '@chakra-ui/react';

import { SettingItemSection } from '../settingItemSection';
import { SecretStore } from '../../../../state/secrets/store';
import { translate } from '../../../../integration/i18n';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { FoundSecretType } from '../../../../constants/enum/foundSecretType';

export const SettingSecrets: React.FC = () => {
    const currentSecrets = SecretStore.useState(store => store);

    const secretsFound = [
        {
            name: 'Harlem Shake',
            howTo: 'Click the Start Menu icon 5 or more times',
            isFound: currentSecrets.secretsFound.includes(FoundSecretType.harlemShake)
        }
    ]

    return (
        <Box className="noselect">
            <SettingItemSection
                heading="Secrets Found"
                subTexts={['Can you find all the secrets hidden in this site?']}
            >
                {
                    secretsFound.map(s => (
                        <Box key={s.name} mt={5} mb={5}>
                            <Checkbox colorScheme={'primary'} iconColor="white" isChecked={true}>{s.name}</Checkbox>
                            <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>{s.howTo}</Text>
                        </Box>
                    ))
                }
            </SettingItemSection>
        </Box>
    );
}

