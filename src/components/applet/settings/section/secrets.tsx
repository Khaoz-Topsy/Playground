import React from 'react';
import { Box, Text, Checkbox, Button } from '@chakra-ui/react';

import { Fireworks } from '../../../../components/common/firework';
import { secretsFound } from '../../../../constants/secretsFound';
import { HiddenSecretsFoundCheckbox } from '../../../common/secret';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { distinctFilter } from '../../../../helper/sortHelper';
import { translate } from '../../../../integration/i18n';
import { SecretStore } from '../../../../state/secrets/store';
import { SettingItemSection } from '../settingItemSection';

export const SettingSecrets: React.FC = () => {
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const distinctCurrentSecretsFound = currentSecretsFound.filter(distinctFilter);

    return (
        <Box marginX={2} className="noselect" position="relative">
            <Fireworks hidden={distinctCurrentSecretsFound.length !== secretsFound.length}>
                <SettingItemSection
                    heading={translate(LocaleKey.settingSecretsFound)}
                    subTexts={[translate(LocaleKey.settingSecretsCanYouFindThemAll)]}
                >
                    {
                        secretsFound.map(s => (
                            s.isFound(distinctCurrentSecretsFound)
                                ? <Box key={s.name} mt={5} mb={5}>
                                    <Checkbox colorScheme="primary" iconColor="white" isChecked={true}>{translate(s.name)}</Checkbox>
                                    <br />
                                    {
                                        s.howTo.map((howTo: LocaleKey, index: number) => (
                                            <span key={howTo}>
                                                <Text display="inline-block" ml={6} fontSize="sm" color="whiteAlpha.600">{translate(howTo)}</Text>
                                                {(index < (s.howTo.length - 1)) ? <>&nbsp;&nbsp;or</> : null}
                                            </span>
                                        ))
                                    }
                                </Box>
                                : <Box key={s.name} mt={5} mb={5}>
                                    <HiddenSecretsFoundCheckbox />
                                </Box>
                        ))
                    }
                </SettingItemSection>
                {
                    (distinctCurrentSecretsFound.length > 0) &&
                    <Button colorScheme="blue" variant="outline" onClick={() => SecretStore.update(store => { store.secretsFound = [] })}>
                        Reset found secrets
                    </Button>
                }
            </Fireworks>
        </Box>
    );
}

