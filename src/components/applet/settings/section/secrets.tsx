import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

import { Fireworks } from '../../../../components/common/firework';
import { ISecretFound, secretsFound } from '../../../../constants/secretsFound';
import { HiddenSecretsFoundCheckbox, HiddenSecretsFoundCheckboxWithDescrip } from '../../../common/secret';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { distinctFilter } from '../../../../helper/sortHelper';
import { translate } from '../../../../integration/i18n';
import { SecretStore } from '../../../../state/secrets/store';
import { SettingItemSection } from '../settingItemSection';
import { useState } from 'react';
import { SettingStore } from '../../../../state/setting/store';
import { FoundSecretType } from '../../../../constants/enum/foundSecretType';
import { CustomCheckbox } from '../../../core/checkbox';

export const SettingSecrets: React.FC = () => {
    const showSecretHints = SettingStore.useState(store => store.showSecretHints);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const distinctCurrentSecretsFound = currentSecretsFound.filter(distinctFilter);

    const setShowSecretHints = () => SettingStore.update(store => {
        store.showSecretHints = !store.showSecretHints;
        return store;
    });

    return (
        <Box marginX={2} className="noselect" position="relative">
            <Fireworks hidden={distinctCurrentSecretsFound.length !== secretsFound.length}>
                <SettingItemSection
                    heading={translate(LocaleKey.settingSecretsFound)}
                    subTexts={[translate(LocaleKey.settingSecretsCanYouFindThemAll)]}
                    topRightChild={
                        <Box mt={2}>
                            <CustomCheckbox name={LocaleKey.showHints} isChecked={showSecretHints} onChange={setShowSecretHints} />
                        </Box>
                    }
                >
                    {
                        secretsFound.map(s => (
                            <Box key={s.name} mt={5} mb={5}>
                                {renderSecretsCheckbox(distinctCurrentSecretsFound, showSecretHints, s)}
                            </Box>
                        ))
                    }
                </SettingItemSection>
                {
                    (distinctCurrentSecretsFound.length > 0) &&
                    <Button colorScheme="blue" variant="outline" onClick={() => SecretStore.update(store => { store.secretsFound = [] })}>
                        {translate(LocaleKey.resetFoundSecrets)}
                    </Button>
                }
            </Fireworks>
        </Box>
    );
}

const renderHowTo = (secret: ISecretFound) => {
    return (
        <>
            {
                secret.howTo.map((howTo: LocaleKey, index: number) => (
                    <span key={howTo}>
                        <Text display="inline-block" ml={6} fontSize="sm" color="whiteAlpha.600">{translate(howTo)}</Text>
                        {(index < (secret.howTo.length - 1)) ? <>&nbsp;&nbsp;or</> : null}
                    </span>
                ))
            }
        </>
    );
}

const renderSecretsCheckbox = (distinctCurrentSecretsFound: Array<FoundSecretType>, showSecretHints: boolean, secret: ISecretFound) => {
    const isFound = secret.isFound(distinctCurrentSecretsFound);

    if (isFound) {
        return (
            <>
                <CustomCheckbox name={secret.name} isChecked={isFound} />
                <br />
                {renderHowTo(secret)}
            </>
        );
    }

    if (showSecretHints) {
        return (
            <>
                <HiddenSecretsFoundCheckbox />
                <br />
                {renderHowTo(secret)}
            </>
        );
    }

    return (<HiddenSecretsFoundCheckboxWithDescrip />);
}
