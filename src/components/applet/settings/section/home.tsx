import React from 'react';
import { debounce } from 'debounce';
import { SunIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Select, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';

import { translate } from '../../../../integration/i18n';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { SettingItemSection } from '../settingItemSection';
import { PullstateCore } from '../../../../state/stateCore';
import { ISecretStore } from '../../../../state/secrets/store';
import { ISettingStore, SettingStore } from '../../../../state/setting/store';
import { withServices } from '../../../../integration/dependencyInjection';

import { IExpectedServices, dependencyInjectionToProps } from './home.dependencyInjection';
import { FoundSecretType } from '../../../../constants/enum/foundSecretType';
import { secretFoundToast } from '../../../core/toast';

interface IWithoutExpectedServices { }
interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const SettingHomeUnconnected: React.FC<IProps> = (props: IProps) => {
    const { SecretStore } = PullstateCore.useStores();
    const currentSettings = SettingStore.useState(store => store);
    const secretsFound = SecretStore.useState(store => store.secretsFound);

    const bgOptions = [
        {
            name: 'Background 1 (default)',
            value: 'bg1',
        },
        {
            name: 'Background 2',
            value: 'bg2',
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
        if (!secretsFound.includes(FoundSecretType.clippy)) {
            secretFoundToast(FoundSecretType.clippy);
            SecretStore.update((store: ISecretStore) => {
                store.secretsFound = [...store.secretsFound, FoundSecretType.clippy];
            })
        }

        if (currentSettings.enabledClippy) {
            props.virtualAssistantService?.hide?.();
        } else {
            props.virtualAssistantService?.show?.();
        }
        SettingStore.update((store: ISettingStore) => {
            store.enabledClippy = !currentSettings.enabledClippy;
        })
    }

    const sliderOnChange = (attr: string) => (newValue: number) => {
        SettingStore.update((store: ISettingStore) => {
            (store as any)[attr] = newValue;
        })
    }

    const {
        background,
        brightness,
        // volume,
        enabledClippy,
    } = currentSettings;

    return (
        <Box ml={2} className="noselect">
            <SettingItemSection
                heading={translate(LocaleKey.settings)}
                subTexts={[translate(LocaleKey.customiseSettings)]}
            >
                <Box my={5}>
                    <Select isFullWidth={true} value={background} onChange={backgroundDropDownChange}>
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
                <SimpleGrid minChildWidth="300px" columnGap="10px" rowGap="10px">
                    <Box mb={2} borderWidth="1px" borderColor="whiteAlpha.700" borderRadius="lg" paddingLeft="4" paddingRight="8" paddingY="2">
                        <Text fontSize="md">{translate(LocaleKey.brightness)}</Text>
                        <Slider mb="1" defaultValue={brightness} onChange={debounce(sliderOnChange('brightness'), 200)}>
                            <SliderTrack>
                                <SliderFilledTrack bg="blue.400" />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <SunIcon color="blue.400" />
                            </SliderThumb>
                        </Slider>
                    </Box>
                    {/* <Box mb={2} borderWidth="1px" borderColor="whiteAlpha.700" borderRadius="lg" paddingLeft="4" paddingRight="8" paddingY="2">
                        <Text fontSize="md">{translate(LocaleKey.volume)}</Text>
                        <Slider mb="1" value={volume} onChange={sliderOnChange('volume')}>
                            <SliderTrack>
                                <SliderFilledTrack bg="blue.400" />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <BellIcon color="blue.400" />
                            </SliderThumb>
                        </Slider>
                    </Box> */}
                </SimpleGrid>
                <Box mt={3} mb={5}>
                    <Checkbox colorScheme={'primary'} iconColor="white" isChecked={enabledClippy} onChange={onEnableClippyChange}>{translate(LocaleKey.enableClippy)}</Checkbox>
                    <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>{translate(LocaleKey.clippyDescription)}</Text>
                </Box>
                {/* <Box my={5}>
                    <Checkbox colorScheme={'primary'} isChecked={colorMode === 'dark'} onChange={toggleColorMode}>Use Dark Mode</Checkbox>
                    <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>Use the website in dark mode.</Text>
                </Box> */}
            </SettingItemSection>
        </Box>
    );
}


export const SettingHome = withServices<IWithoutExpectedServices, IExpectedServices>(
    SettingHomeUnconnected,
    dependencyInjectionToProps
);
