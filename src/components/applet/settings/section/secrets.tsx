import React from 'react';
import { Box, Text, Checkbox, Stack, Skeleton } from '@chakra-ui/react';

import { SettingItemSection } from '../settingItemSection';
import { SecretStore } from '../../../../state/secrets/store';
import { FoundSecretType } from '../../../../constants/enum/foundSecretType';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { translate } from '../../../../integration/i18n';

export const SettingSecrets: React.FC = () => {
    const currentSecrets = SecretStore.useState(store => store);

    const secretsFound = [
        {
            name: LocaleKey.clippy,
            howTo: LocaleKey.clippySecretDescription,
            isFound: currentSecrets.secretsFound.includes(FoundSecretType.clippy)
        },
        {
            name: LocaleKey.nyanCat,
            howTo: LocaleKey.nyanCatSecretDescription,
            isFound: currentSecrets.secretsFound.includes(FoundSecretType.nyanCat)
        },
        {
            name: LocaleKey.harlemShake,
            howTo: LocaleKey.harlemShakeSecretDescription,
            isFound: currentSecrets.secretsFound.includes(FoundSecretType.harlemShake)
        }
    ]

    return (
        <Box marginX={2} className="noselect">
            <SettingItemSection
                heading={translate(LocaleKey.settingSecretsFound)}
                subTexts={[translate(LocaleKey.settingSecretsCanYouFindThemAll)]}
            >
                {
                    secretsFound.map(s => (
                        s.isFound
                            ? <Box key={s.name} mt={5} mb={5}>
                                <Checkbox colorScheme="primary" iconColor="white" isChecked={true}>{translate(s.name)}</Checkbox>
                                <Text ml={6} fontSize="sm" color="whiteAlpha.600">{translate(s.howTo)}</Text>
                            </Box>
                            : <Box key={s.name} mt={5} mb={5}>
                                <Stack>
                                    <Box>
                                        <Checkbox colorScheme="primary" iconColor="white" isChecked={false}>
                                            <Skeleton height="20px" width="100px" startColor="gray.500" endColor="gray.500" />
                                        </Checkbox>
                                    </Box>
                                    <Skeleton height="20px" width="50%" style={{ marginLeft: '1.5em' }} startColor="gray.500" endColor="gray.500" />
                                </Stack>
                            </Box>
                    ))
                }
            </SettingItemSection>
        </Box>
    );
}

