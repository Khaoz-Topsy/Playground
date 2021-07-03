import React from 'react';
import { SettingsIcon, InfoOutlineIcon, StarIcon, QuestionIcon, UnlockIcon } from '@chakra-ui/icons';

import { SettingHome } from './section/home';
import { SettingAbout } from './section/about';
import { SettingGithub } from './section/github';
import { SettingSecrets } from './section/secrets';
import { SettingPersonalSocials } from './section/personalSocials';
import { SettingOtherSocials } from './section/otherSocials';
import { LocaleKey } from '../../../localization/LocaleKey';

export const chakraIconMarginRight = "3";
export const chakraIconMarginBottom = "1";
export const settingPages = [
    {
        title: LocaleKey.general,
        comp: <SettingHome />,
        icon: <SettingsIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
    },
    {
        title: LocaleKey.github,
        comp: <SettingGithub />,
        icon: <InfoOutlineIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
    },
    {
        title: LocaleKey.personalSocials,
        comp: <SettingPersonalSocials />,
        icon: <StarIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
    },
    {
        title: LocaleKey.otherSocials,
        comp: <SettingOtherSocials />,
        icon: <StarIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
    },
    {
        title: LocaleKey.settingSecrets,
        comp: <SettingSecrets />,
        icon: <UnlockIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
    },
    {
        title: LocaleKey.about,
        comp: <SettingAbout />,
        icon: <QuestionIcon mr={chakraIconMarginRight} mb={chakraIconMarginBottom} />,
    },
];
