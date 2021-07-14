import React from 'react';
import { Box, Text, Kbd, Code } from '@chakra-ui/react';

import { keybindsPerSection } from '../../../../constants/keybind';
import { IKeyBindShortcut } from '../../../../contracts/interface/IKeybind';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { translate } from '../../../../integration/i18n';

import { SettingItemSection } from '../settingItemSection';

export const SettingKeybind: React.FC = () => {

    return (
        <Box marginLeft={2} marginRight={4} className="noselect">
            {/* TODO - Keyboard shortcuts */}
            <SettingItemSection
                heading={translate(LocaleKey.settingSecretsFound)}
                subTexts={[translate(LocaleKey.settingSecretsCanYouFindThemAll)]}
            >
                {
                    keybindsPerSection.map(kSect => (
                        <Box key={kSect.name} mt={5} mb={5}>
                            <Text fontSize="xl" color="whiteAlpha.900">{translate(kSect.name)}</Text>
                            {
                                kSect.shortcuts.map(kSectKeyBind => (
                                    <KeybindShortcut
                                        key={kSectKeyBind.name}
                                        keyBind={kSectKeyBind}
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
    keyBind: IKeyBindShortcut,
}
export const KeybindShortcut: React.FC<IKeybindShortcut> = (props: IKeybindShortcut) => {
    const displayKeyBindName = (keyBind: IKeyBindShortcut) => {
        return (
            <Text display="inline" fontSize="md" wordBreak="break-all" color="whiteAlpha.800" mr={3}>{translate(keyBind.name)}&nbsp;:</Text>
        )
    }

    const displayKeyBindDetails = (keyBind: IKeyBindShortcut) => {
        if (keyBind.descrip) return (<Code>{translate(keyBind.descrip)}</Code>);

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

