import React from 'react';
import { Box, Text, Kbd, Tooltip } from '@chakra-ui/react';

import { keybindsPerSection } from '../../../../constants/keybind';
import { IKeyBindShortcut } from '../../../../contracts/interface/IKeybind';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { translate } from '../../../../integration/i18n';

import { SettingItemSection } from '../settingItemSection';

export const SettingKeybind: React.FC = () => {

    return (
        <Box marginLeft={2} marginRight={4} className="noselect">
            <SettingItemSection
                heading={translate(LocaleKey.keyboardShortcuts)}
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
        if (keyBind.descrip) return (
            <Tooltip hasArrow label={translate(keyBind.descrip)}
                placement="top-start" aria-label="Tooltip about the hidden secret">
                <Kbd lineHeight="8" fontSize="lg">{keyBind.keys.map((kstr: any) => translate(kstr))}</Kbd>
            </Tooltip>
        );

        return (
            <>
                {displayKeys(keyBind.keys)}
                {
                    keyBind.altKeys && <>
                        <b>&nbsp;&nbsp;or&nbsp;&nbsp;</b>
                        {displayKeys(keyBind.altKeys)}
                    </>
                }
            </>
        )
    }

    const displayKeys = (keys: Array<string>) => {
        return (keys.map((kKey: string, index: number) => (
            <div key={kKey} style={{ display: 'inline-block' }}>
                {renderKbd(kKey)}
                {(index < (keys.length - 1)) ? <>&nbsp;+&nbsp;</> : null}
            </div>
        )))
    }

    const renderKbd = (kKey: string) => <Kbd lineHeight="8" fontSize="lg">{kKey}</Kbd>

    return (
        <Box key={props.keyBind.name} ml={5} width="100%">
            {displayKeyBindName(props.keyBind)}
            {displayKeyBindDetails(props.keyBind)}
        </Box>

    );
}

