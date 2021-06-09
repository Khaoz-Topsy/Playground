import React from 'react';
import { Box, Select } from '@chakra-ui/react';

import { SettingItemSection } from '../settingItemSection';
import { ISettingStore, SettingStore } from '../../../../state/setting/store';
import { Background } from '../../../../constants/appImage';

export const SettingHome: React.FC = () => {
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

    return (
        <Box>
            <SettingItemSection
                heading="Settings"
                subTexts={['Customise the site to your preferences']}
            >
                {/* <Box my={4}>
                    <Checkbox colorScheme={'primary'} defaultIsChecked>Participate in official tournaments.</Checkbox>
                    <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>Whether or not your bot will be added to the official tournament lineup.</Text>
                </Box>
                <Box my={4}>
                    <Checkbox colorScheme={'primary'} defaultIsChecked>Participate in friendly tournaments.</Checkbox>
                    <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>Whether or not your bot will be added to the friendly tournament lineup.</Text>
                </Box> */}
                <Box my={4}>
                    <Select isFullWidth={true} value={currentSettings.background} onChange={backgroundDropDownChange}>
                        {
                            bgOptions.map(dropdownOpt => {
                                return (
                                    <option
                                        key={dropdownOpt.value}
                                        value={dropdownOpt.value}
                                    >
                                        {dropdownOpt.name}
                                    </option>
                                );
                            })
                        }
                    </Select>
                </Box>
            </SettingItemSection>
        </Box>
    );
}

