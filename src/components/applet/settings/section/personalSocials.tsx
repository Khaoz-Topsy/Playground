import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import {
    PersonalGithub, PersonalTwitter, PersonalTwitch, PersonalLinkedIn, PersonalSteam, PersonalDiscord,/*PersonalYoutube,*/
} from '../../../socialButtons';
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
        </div>
    );
}

