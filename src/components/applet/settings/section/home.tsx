import React from 'react';
import { Box, Checkbox, Select, Text } from '@chakra-ui/react';

import { SettingItemSection } from '../settingItemSection';
import { ISettingStore, SettingStore } from '../../../../state/setting/store';
import { Background } from '../../../../constants/appImage';
import { withServices } from '../../../../integration/dependencyInjection';

import { IExpectedServices, dependencyInjectionToProps } from './home.dependencyInjection';

interface IWithoutExpectedServices { }
interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const SettingHomeUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSettings = SettingStore.useState(store => store);

    const bgOptions = [
        {
            name: 'Background 1 (default)',
            value: Background.bg1,
        },
        {
            name: 'Background 2',
            value: Background.bg2,
        }
    ];

    const backgroundDropDownChange = (e: any) => {
        const newValue = e?.target?.value;
        if (newValue == null) return;

        SettingStore.update((store: ISettingStore) => {
            store.background = newValue;
        })
    }

    const onEnableClippyChange = (e: any) => {
        if (currentSettings.enabledClippy) {
            props.virtualAssistantService?.hide?.();
        } else {
            props.virtualAssistantService?.show?.();
        }
        SettingStore.update((store: ISettingStore) => {
            store.enabledClippy = !currentSettings.enabledClippy;
        })
    }

    return (
        <Box>
            <SettingItemSection
                heading="Settings"
                subTexts={['Customise the site to your preferences']}
            >
                <Box my={5}>
                    <Select isFullWidth={true} value={currentSettings.background} onChange={backgroundDropDownChange}>
                        {
                            bgOptions.map(dropdownOpt => {
                                return (
                                    <option key={dropdownOpt.value} value={dropdownOpt.value}>
                                        {dropdownOpt.name}
                                    </option>
                                );
                            })
                        }
                    </Select>
                </Box>
                <Box my={5}>
                    <Checkbox colorScheme={'primary'} isChecked={currentSettings.enabledClippy} onChange={onEnableClippyChange}>Enable Clippy</Checkbox>
                    <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>Get tips from the best virtual assistant to have ever lived! Disable to ensure that Clippy stays hidden.</Text>
                </Box>
            </SettingItemSection>
        </Box>
    );
}


export const SettingHome = withServices<IWithoutExpectedServices, IExpectedServices>(
    SettingHomeUnconnected,
    dependencyInjectionToProps
);
