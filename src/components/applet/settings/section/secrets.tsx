import React from 'react';
import { Box, Text, Checkbox, Stack, Skeleton } from '@chakra-ui/react';

import { SettingItemSection } from '../settingItemSection';
import { getSecretsFound } from '../../../../constants/secretsFound';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { translate } from '../../../../integration/i18n';
import { PullstateCore } from '../../../../state/stateCore';

export const SettingSecrets: React.FC = () => {
    const { SecretStore } = PullstateCore.useStores();
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);

    const secretsFound = getSecretsFound(currentSecretsFound);

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

