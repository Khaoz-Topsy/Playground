import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import {
    PersonalGithub, PersonalTwitter, PersonalTwitch, PersonalLinkedIn, PersonalSteam, PersonalDiscord,/*PersonalYoutube,*/
} from '../../../socialButtons';
import { BasicLazyImage } from '../../../core/image';
import { SettingItemSection } from '../settingItemSection';

export const SettingPersonalSocials: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <SettingItemSection heading="Personal accounts" showDivider={false}>
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
            <BasicLazyImage imageUrl="https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;line_height=24" alt="Github Stats" classNames="mt1 m-h-auto" />
            <BasicLazyImage imageUrl="https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy" alt="Github Language Stats" classNames="mt1 m-h-auto" />
        </div>
    );
}

