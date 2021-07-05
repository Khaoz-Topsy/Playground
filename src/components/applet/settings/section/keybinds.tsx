import React from 'react';
import { Box, Text, Kbd, Code } from '@chakra-ui/react';

import { HiddenSecretsFoundKeybind } from '../../../common/secret';
import { keybindsPerSection } from '../../../../constants/keybind';
import { IKeyBindShortcut } from '../../../../contracts/interface/IKeybind';
import { FoundSecretType } from '../../../../constants/enum/foundSecretType';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { translate } from '../../../../integration/i18n';
import { SecretStore } from '../../../../state/secrets/store';

import { SettingItemSection } from '../settingItemSection';

export const SettingKeybind: React.FC = () => {
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);

    return (
        <Box marginLeft={2} marginRight={4} className="noselect">
            <SettingItemSection
                heading={translate(LocaleKey.settingSecretsFound)}
                subTexts={[translate(LocaleKey.settingSecretsCanYouFindThemAll)]}
            >
                {
                    keybindsPerSection.map(kSect => (
                        <Box key={kSect.name} mt={5} mb={5}>
                            <Text fontSize="xl" color="whiteAlpha.900">{kSect.name}</Text>
                            {
                                kSect.shortcuts.map(kSectKeyBind => (
                                    <KeybindShortcut
                                        key={kSectKeyBind.name}
                                        keyBind={kSectKeyBind}
                                        currentSecretsFound={currentSecretsFound}
                                    />
                                ))
                            }
                        </Box>
                    ))
                }
            </SettingItemSection>
        </Box>
    );
}


interface IKeybindShortcut {
    currentSecretsFound: Array<FoundSecretType>,
    keyBind: IKeyBindShortcut,
}
export const KeybindShortcut: React.FC<IKeybindShortcut> = (props: IKeybindShortcut) => {
    const displayKeyBindName = (keyBind: IKeyBindShortcut) => {
        if (keyBind.requiredSecret != null && !props.currentSecretsFound.includes(keyBind.requiredSecret)) {
            return (<span></span>);
        }
        return (
            <Text display="inline" fontSize="md" wordBreak="break-all" color="whiteAlpha.800" mr={3}>{keyBind.name}&nbsp;:</Text>
        )
    }

    const displayKeyBindDetails = (keyBind: IKeyBindShortcut) => {
        if (keyBind.requiredSecret != null && !props.currentSecretsFound.includes(keyBind.requiredSecret)) {
            return (<HiddenSecretsFoundKeybind />);
        }
        if (keyBind.descrip) return (<Code>{keyBind.descrip}</Code>);

        return (keyBind.keys.map((kKey: string, index: number) => (
            <div key={kKey} style={{ display: 'inline-block' }}>
                <Kbd lineHeight="8" fontSize="lg">{kKey}</Kbd>
                {(index < (keyBind.keys.length - 1)) ? <>&nbsp;+&nbsp;</> : null}
            </div>
        )))
    }

    return (
        <Box key={props.keyBind.name} ml={5} width="100%">
            {displayKeyBindName(props.keyBind)}
            {displayKeyBindDetails(props.keyBind)}
        </Box>

    );
}

