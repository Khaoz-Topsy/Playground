import React from 'react';
import { SunIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Select, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useToast } from '@chakra-ui/react';

import { FoundSecretType } from '../../../../constants/enum/foundSecretType';
import { Backgrounds } from '../../../../constants/appImage';
import { Fonts } from '../../../../constants/font';
import { CustomCheckbox } from '../../../../components/core/checkbox';
import { addSecretIfNotFound } from '../../../../helper/secretFoundHelper';
import { changeLocalization, supportedLangs, translate } from '../../../../integration/i18n';
import { withServices } from '../../../../integration/dependencyInjection';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { SettingItemSection } from '../settingItemSection';
import { SecretStore } from '../../../../state/secrets/store';
import { ISettingStore, SettingStore } from '../../../../state/setting/store';

import { IExpectedServices, dependencyInjectionToProps } from './home.dependencyInjection';
import { setFontClass } from '../../../../helper/documentHelper';

interface IWithoutExpectedServices { }
interface IProps extends IWithoutExpectedServices, IExpectedServices { }

export const SettingHomeUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSettings = SettingStore.useState(store => store);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    const stateChange = (prop: string) => (e: any) => {
        const newValue = e?.target?.value;
        if (newValue == null) return;

        SettingStore.update((store: ISettingStore) => {
            (store as any)[prop] = newValue;
        })
    }

    const languageDropDownChange = (e: any) => {
        const newValue = e?.target?.value;
        if (newValue == null) return;

        SettingStore.update((store: ISettingStore) => {
            store.language = newValue;
        });
        changeLocalization(newValue);
    }

    const fontDropDownChange = (e: any) => {
        const newValue = e?.target?.value;
        if (newValue == null) return;

        SettingStore.update((store: ISettingStore) => {
            store.font = newValue;
        });
        setFontClass(newValue);
    }

    const onEnableClippyChange = (e: any) => {
        addSecretIfNotFound({
            secretStore: SecretStore,
            currentSecretsFound,
            toastFunc,
            secretToAdd: FoundSecretType.clippy,
        });

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
        font,
        // volume,
        language,
        enabledClippy,
    } = currentSettings;

    return (
        <Box ml={2} className="noselect">
            <SettingItemSection
                heading={translate(LocaleKey.settings)}
                subTexts={[translate(LocaleKey.customiseSettings)]}
            >
                <SimpleGrid mt={2} mb={4} minChildWidth="250px" columnGap="10px" rowGap="10px">
                    <FormControl mt={1}>
                        <FormLabel>{translate(LocaleKey.language)}</FormLabel>
                        <Select width="100%" value={language} onChange={languageDropDownChange}>
                            {
                                supportedLangs.map(dropdownOpt => {
                                    return (
                                        <option key={dropdownOpt.value} value={dropdownOpt.value}>
                                            {dropdownOpt.name}
                                        </option>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl mt={1}>
                        <FormLabel>{translate(LocaleKey.wallpaper)}</FormLabel>
                        <Select width="100%" value={background} onChange={stateChange('background')}>
                            {
                                Backgrounds.map(dropdownOpt => {
                                    return (
                                        <option key={dropdownOpt.value} value={dropdownOpt.value}>
                                            {dropdownOpt.name}
                                        </option>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl mt={1}>
                        <FormLabel>{translate(LocaleKey.font)}</FormLabel>
                        <Select width="100%" value={font} onChange={fontDropDownChange}>
                            {
                                Fonts.map(dropdownOpt => {
                                    return (
                                        <option key={dropdownOpt.value} value={dropdownOpt.value}>
                                            {dropdownOpt.name}
                                        </option>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl mt={1}>
                        <FormLabel>{translate(LocaleKey.brightness)}</FormLabel>
                        <Box mb={2} borderWidth="1px" borderColor="whiteAlpha.700" borderRadius="lg" paddingLeft="4" paddingRight="8" paddingY="2" className="border-transition">
                            <Slider mb={1.5} defaultValue={brightness} onChange={sliderOnChange('brightness')}>
                                <SliderTrack>
                                    <SliderFilledTrack bg="blue.400" />
                                </SliderTrack>
                                <SliderThumb boxSize={6}>
                                    <SunIcon color="blue.400" />
                                </SliderThumb>
                            </Slider>
                        </Box>
                    </FormControl>
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
                <SimpleGrid minChildWidth="300px" columnGap="10px" rowGap="10px">
                    <Box mt={3} mb={5}>
                        <CustomCheckbox name={LocaleKey.enableClippy} isChecked={enabledClippy} onChange={onEnableClippyChange} />
                        <Text ml={6} fontSize={'sm'} color={'whiteAlpha.600'}>{translate(LocaleKey.clippyDescription)}</Text>
                    </Box>
                </SimpleGrid>
            </SettingItemSection>
        </Box>
    );
}


export const SettingHome = withServices<IWithoutExpectedServices, IExpectedServices>(
    SettingHomeUnconnected,
    dependencyInjectionToProps
);
