import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import {
    PersonalGithub, PersonalTwitter, PersonalTwitch, PersonalLinkedIn, PersonalSteam, PersonalDiscord,/*PersonalYoutube,*/
} from '../../../socialButtons';
import { BasicLazyImage } from '../../../core/image';
import { SettingItemSection } from '../settingItemSection';
import { LocaleKey } from '../../../../localization/LocaleKey';
import { translate } from '../../../../integration/i18n';

export const SettingPersonalSocials: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <SettingItemSection heading={translate(LocaleKey.personalAccounts)}
                headingTooltip={LocaleKey.personalAccountNamingInconsistency}
                showDivider={false}>
                <SimpleGrid minChildWidth="200px" columnGap="10px" rowGap="10px" className="mt1">
                    <PersonalGithub />
                    <PersonalTwitter />
                    <PersonalTwitch />
                    <PersonalLinkedIn />
                    <PersonalSteam />
                    <PersonalDiscord />
                    {/* <PersonalYoutube /> */}
                </SimpleGrid>
            </SettingItemSection>
            <hr />
            <BasicLazyImage imageUrl="https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;hide_border=true&amp;theme=tokyonight" alt="Github Stats" classNames="mt1 m-h-auto" />
            <BasicLazyImage imageUrl="https://github-readme-streak-stats.herokuapp.com?user=Khaoz-Topsy&amp;theme=dark&amp;hide_border=true&amp;date_format=%5BY%20%5DM%20j" alt="Github streak Stats" classNames="mt1 m-h-auto" />
            <BasicLazyImage imageUrl="https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy&amp;show_icons=true&amp;hide_border=true&amp;theme=tokyonight" alt="Github Language Stats" classNames="mt1 m-h-auto" />
        </div>
    );
}

